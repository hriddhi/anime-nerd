import React from 'react';
import { InteractionManager, View, Text, ActivityIndicator, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { VictoryBar, VictoryLabel, VictoryTheme, VictoryPie, VictoryChart } from "victory-native";
import { connect } from 'react-redux';
import { fetchAnimeStats } from '../../redux/ActionCreator'

const mapStateToProps = (state,props) => ({
    anime: state.anime[props.route.params.id],
    stats: state.stats[props.route.params.id],
    theme: state.options.ui
})

const mapDispatchToProps = dispatch => ({
    fetchAnimeStats: (id) => dispatch(fetchAnimeStats(id))
})

const bar_color = [
    'rgba(128,0,255,0.8)',
    'rgba(153,51,255,0.8)',
    'rgba(166,77,255,0.8)',
    'rgba(179,102,255,0.8)',
    'rgba(191,128,255,0.8)',
    'rgba(101,163,255,0.8)',
    'rgba(51,133,255,0.8)',
    'rgba(26,117,255,0.8)',
    'rgba(0,102,255,0.8)',
    'rgba(0,92,230,0.8)',
]

function nFormatter(num, digits) {
    var si = [
        { value: 1, symbol: "" },
        { value: 1E3, symbol: "k" },
        { value: 1E6, symbol: "M" },
        { value: 1E9, symbol: "G" },
        { value: 1E12, symbol: "T" },
        { value: 1E15, symbol: "P" },
        { value: 1E18, symbol: "E" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

class Stats extends React.PureComponent {

    state = {
        interactionDone: false
    }

    componentDidMount() {
        if(this.props.stats === undefined)
            this.props.fetchAnimeStats(this.props.route.params.id)       
        this.setState({ interactionDone: true })
        
    }

    render() {

        if(!this.state.interactionDone || this.props.stats === undefined || this.props.stats && this.props.stats.isLoading){
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size='large' color='#fff'/>
                </View>
            )
        } else {

            const stats = this.props.stats.stats
            const data = [
                { x: "Watching", y: stats.watching, color: "rgba(94, 156, 255, 0.7)" },
                { x: "Planned", y: stats.plan_to_watch, color: "rgba(38, 122, 255, 0.7)" },
                { x: "Completed", y: stats.completed, color: "rgba(2, 89, 227, 0.7)" },
                { x: "On Hold", y: stats.on_hold, color: "rgba(32, 57, 199, 0.7)" },
                { x: "Dropped", y: stats.dropped, color: "rgba(0, 5, 153, 0.7)" },
            ]

            const data_bar = [
                { x: 1, y: stats.scores[1].votes },
                { x: 2, y: stats.scores[2].votes },
                { x: 3, y: stats.scores[3].votes },
                { x: 4, y: stats.scores[4].votes },
                { x: 5, y: stats.scores[5].votes },
                { x: 6, y: stats.scores[6].votes },
                { x: 7, y: stats.scores[7].votes },
                { x: 8, y: stats.scores[8].votes },
                { x: 9, y: stats.scores[9].votes },
                { x: 10, y: stats.scores[10].votes }
            ]

            return (
                <ScrollView contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 8 }}>
                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: this.props.theme[this.props.theme.current].anime.card, marginBottom: 8, borderRadius: 10, overflow: 'hidden' }}>
                        <View style={{ flex: 1, flexGrow: 1, padding: 8, alignItems: 'center', borderRightWidth: 1, borderColor: '#b0b0b0a0' }} >
                            <Text style={{ color: this.props.theme[this.props.theme.current].anime.text, fontSize: 12, fontFamily: 'SpaceGrotesk-Bold', }}>SCORE</Text>
                            <Text style={{ color: this.props.theme[this.props.theme.current].anime.text, fontSize: 20, fontFamily: 'SpaceGrotesk-Bold', }}>{ this.props.anime.anime && this.props.anime.anime.mean ? this.props.anime.anime.mean : '-' }</Text>
                        </View>
                        <View style={{ flex: 1, flexGrow: 1, padding: 8, alignItems: 'center', borderRightWidth: 1, borderColor: '#b0b0b0a0' }} >
                            <Text style={{ color: this.props.theme[this.props.theme.current].anime.text, fontSize: 12, fontFamily: 'SpaceGrotesk-Bold', }}>RANK</Text>
                            <Text style={{ color: this.props.theme[this.props.theme.current].anime.text, fontSize: 20, fontFamily: 'SpaceGrotesk-Bold', }}>{ this.props.anime.anime && this.props.anime.anime.rank ? '#' + this.props.anime.anime.rank : '-' }</Text>
                        </View>
                        <View style={{ flex: 1, flexGrow: 1, padding: 8, alignItems: 'center', borderRightWidth: 1, borderColor: '#b0b0b0a0' }} >
                            <Text style={{ color: this.props.theme[this.props.theme.current].anime.text, fontSize: 12, fontFamily: 'SpaceGrotesk-Bold', }}>POPULARITY</Text>
                            <Text style={{ color: this.props.theme[this.props.theme.current].anime.text, fontSize: 20, fontFamily: 'SpaceGrotesk-Bold', }}>{ this.props.anime.anime && this.props.anime.anime.popularity ? '#' + this.props.anime.anime.popularity : '-' }</Text>
                        </View>
                        <View style={{ flex: 1, flexGrow: 1, padding: 8, alignItems: 'center' }} >
                            <Text style={{ color: this.props.theme[this.props.theme.current].anime.text, fontSize: 12, fontFamily: 'SpaceGrotesk-Bold', }}>TOTAL</Text>
                            <Text style={{ color: this.props.theme[this.props.theme.current].anime.text, fontSize: 20, fontFamily: 'SpaceGrotesk-Bold', }}>{nFormatter(stats.total, 1)}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: this.props.theme[this.props.theme.current].anime.card, marginBottom: 8, height: 260, borderRadius: 10, overflow: 'hidden' }}>
                        <Text style={{ color: this.props.theme[this.props.theme.current].anime.text, fontSize: 18, fontFamily: 'SpaceGrotesk-Bold', position: 'absolute', top: 8, left: 12}}>Summary Stats</Text>
                        <View style={{ flex: 1, flexGrow: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                            {
                                data.map((val,index) => (
                                    <View key={index} style={{ flexDirection: 'row', height: 30 }}>
                                        <Text style={{ color: this.props.theme[this.props.theme.current].anime.text, fontFamily: 'SpaceGrotesk-SemiBold', alignSelf: 'center' }}>{val.x}</Text>
                                        <View style={{ height: 20, width: 40, borderRadius: 10, backgroundColor: val.color, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginLeft: 8 }}>
                                            <Text style={{ color: this.props.theme[this.props.theme.current].anime.text, fontFamily: 'SpaceGrotesk-SemiBold', fontSize: 12, textAlign: 'center', color: '#fff', marginTop: -1 }}>{Math.round((val.y/stats.total) * 100)}%</Text>
                                        </View>
                                    </View>
                                ))
                            }
                        </View>
                        <View style={{ flex: 1, flexGrow: 1 }}>
                            <VictoryPie
                                data={data}
                                height={300}
                                labels={()=>null}
                                padding={{ left: 0, right: 0, top: 32, bottom: 32 }}  
                                origin={{ x: Math.ceil((Dimensions.get('window').width - 16)/2) , y: 130 }}
                                endAngle={-180}
                                colorScale={["rgba(94, 156, 255)", "rgba(38, 122, 255)", "rgba(2, 89, 227)", "rgba(32, 57, 199)", "rgba(0, 5, 153)"]}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, backgroundColor: this.props.theme[this.props.theme.current].anime.card, height: 340, borderRadius: 10, overflow: 'hidden' }}>
                        <Text style={{ color: this.props.theme[this.props.theme.current].anime.text, fontSize: 18, fontFamily: 'SpaceGrotesk-Bold', paddingTop: 8, paddingLeft: 12 }}>Rating Stats</Text>
                        <VictoryBar
                            barRatio={1}
                            width={Math.ceil(Dimensions.get('window').width - 24)}
                            labels={({ datum }) => datum.x === 10 ? `${datum.x}   ${nFormatter(datum.y,0)}` : `  ${datum.x}   ${nFormatter(datum.y,0)}`}
                            horizontal
                            domainPadding={30}
                            data={data_bar}
                            padding={{ left: 0 , top: 0, bottom: 0, right: 8 }}
                            cornerRadius={{ topLeft: 12, topRight: 12 }}
                            style={{ labels: { fontFamily: 'SpaceGrotesk-Bold', fill: this.props.theme[this.props.theme.current].anime.text }, data: { fill: ({ datum }) => bar_color[datum.x - 1] } }}
                            labelComponent={<VictoryLabel dx={-21}/>}
                        />
                    </View>
                </ScrollView>
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats)