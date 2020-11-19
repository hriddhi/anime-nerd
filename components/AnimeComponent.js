import React from 'react';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { Avatar, ListItem, Image } from 'react-native-elements';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  anime: state.anime
})

class Anime extends React.Component {

    render() {

        const anime = this.props.anime.anime

        if(anime === null){
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size='large' />
                </View>
            )
        } else {
            return (  
                <ScrollView>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View>
                            <Image source={{ uri: anime.main_picture.medium }} style={{ width: 140, height: 200, flex: 1 }}/>
                            <Text style={{flex: 1}}>{anime.title}</Text>
                        </View>
                    </View>
                </ScrollView>
            );
        }
    }
}

export default connect(mapStateToProps)(Anime);

/*
{
    "id": 31964,
    "title": "Boku no Hero Academia",
    "main_picture": {
        "medium": "https://api-cdn.myanimelist.net/images/anime/10/78745.jpg",
        "large": "https://api-cdn.myanimelist.net/images/anime/10/78745l.jpg"
    },
    "alternative_titles": {
        "synonyms": [],
        "en": "My Hero Academia",
        "ja": "僕のヒーローアカデミア"
    },
    "start_date": "2016-04-03",
    "end_date": "2016-06-26",
    "synopsis": "The appearance of \"quirks,\" newly discovered super powers, has been steadily increasing over the years, with 80 percent of humanity possessing various abilities from manipulation of elements to shapeshifting. This leaves the remainder of the world completely powerless, and Izuku Midoriya is one such individual.\n\nSince he was a child, the ambitious middle schooler has wanted nothing more than to be a hero. Izuku's unfair fate leaves him admiring heroes and taking notes on them whenever he can. But it seems that his persistence has borne some fruit: Izuku meets the number one hero and his personal idol, All Might. All Might's quirk is a unique ability that can be inherited, and he has chosen Izuku to be his successor!\n\nEnduring many months of grueling training, Izuku enrolls in UA High, a prestigious high school famous for its excellent hero training program, and this year's freshmen look especially promising. With his bizarre but talented classmates and the looming threat of a villainous organization, Izuku will soon learn what it really means to be a hero.\n\n[Written by MAL Rewrite]",
    "mean": 8.16,
    "rank": 342,
    "popularity": 7,
    "num_list_users": 1688723,
    "num_scoring_users": 1123942,
    "nsfw": "white",
    "created_at": "2015-10-27T08:31:53+00:00",
    "updated_at": "2020-11-18T14:28:46+00:00",
    "media_type": "tv",
    "status": "finished_airing",
    "genres": [
        {
            "id": 1,
            "name": "Action"
        },
        {
            "id": 4,
            "name": "Comedy"
        },
        {
            "id": 23,
            "name": "School"
        },
        {
            "id": 27,
            "name": "Shounen"
        },
        {
            "id": 31,
            "name": "Super Power"
        }
    ],
    "my_list_status": {
        "status": "completed",
        "score": 9,
        "num_episodes_watched": 13,
        "is_rewatching": false,
        "updated_at": "2020-11-04T21:09:56+00:00"
    },
    "num_episodes": 13,
    "start_season": {
        "year": 2016,
        "season": "spring"
    },
    "broadcast": {
        "day_of_the_week": "sunday",
        "start_time": "17:00"
    },
    "source": "manga",
    "average_episode_duration": 1470,
    "rating": "pg_13",
    "pictures": [
        {
            "medium": "https://api-cdn.myanimelist.net/images/anime/9/76970.jpg",
            "large": "https://api-cdn.myanimelist.net/images/anime/9/76970l.jpg"
        },
        {
            "medium": "https://api-cdn.myanimelist.net/images/anime/2/77692.jpg",
            "large": "https://api-cdn.myanimelist.net/images/anime/2/77692l.jpg"
        },
        {
            "medium": "https://api-cdn.myanimelist.net/images/anime/10/78745.jpg",
            "large": "https://api-cdn.myanimelist.net/images/anime/10/78745l.jpg"
        },
        {
            "medium": "https://api-cdn.myanimelist.net/images/anime/1109/92566.jpg",
            "large": "https://api-cdn.myanimelist.net/images/anime/1109/92566l.jpg"
        },
        {
            "medium": "https://api-cdn.myanimelist.net/images/anime/1618/92567.jpg",
            "large": "https://api-cdn.myanimelist.net/images/anime/1618/92567l.jpg"
        },
        {
            "medium": "https://api-cdn.myanimelist.net/images/anime/1600/92568.jpg",
            "large": "https://api-cdn.myanimelist.net/images/anime/1600/92568l.jpg"
        },
        {
            "medium": "https://api-cdn.myanimelist.net/images/anime/1262/92569.jpg",
            "large": "https://api-cdn.myanimelist.net/images/anime/1262/92569l.jpg"
        },
        {
            "medium": "https://api-cdn.myanimelist.net/images/anime/1949/92570.jpg",
            "large": "https://api-cdn.myanimelist.net/images/anime/1949/92570l.jpg"
        },
        {
            "medium": "https://api-cdn.myanimelist.net/images/anime/1985/96688.jpg",
            "large": "https://api-cdn.myanimelist.net/images/anime/1985/96688l.jpg"
        }
    ],
    "background": "Mangaka Horikoushi Kouhei has noted that American superhero comics are the inspiration for the series, and has based character pages on logos for Marvel and DC comic characters.",
    "related_anime": [
        {
            "node": {
                "id": 33486,
                "title": "Boku no Hero Academia 2nd Season",
                "main_picture": {
                    "medium": "https://api-cdn.myanimelist.net/images/anime/12/85221.jpg",
                    "large": "https://api-cdn.myanimelist.net/images/anime/12/85221l.jpg"
                }
            },
            "relation_type": "sequel",
            "relation_type_formatted": "Sequel"
        },
        {
            "node": {
                "id": 33929,
                "title": "Boku no Hero Academia: Sukue! Kyuujo Kunren!",
                "main_picture": {
                    "medium": "https://api-cdn.myanimelist.net/images/anime/1470/103166.jpg",
                    "large": "https://api-cdn.myanimelist.net/images/anime/1470/103166l.jpg"
                }
            },
            "relation_type": "side_story",
            "relation_type_formatted": "Side story"
        },
        {
            "node": {
                "id": 35262,
                "title": "Boku no Hero Academia 2nd Season: Hero Note",
                "main_picture": {
                    "medium": "https://api-cdn.myanimelist.net/images/anime/11/84951.jpg",
                    "large": "https://api-cdn.myanimelist.net/images/anime/11/84951l.jpg"
                }
            },
            "relation_type": "summary",
            "relation_type_formatted": "Summary"
        }
    ],
    "related_manga": [],
    "recommendations": [
        {
            "node": {
                "id": 30276,
                "title": "One Punch Man",
                "main_picture": {
                    "medium": "https://api-cdn.myanimelist.net/images/anime/12/76049.jpg",
                    "large": "https://api-cdn.myanimelist.net/images/anime/12/76049l.jpg"
                }
            },
            "num_recommendations": 89
        },
        {
            "node": {
                "id": 34572,
                "title": "Black Clover",
                "main_picture": {
                    "medium": "https://api-cdn.myanimelist.net/images/anime/2/88336.jpg",
                    "large": "https://api-cdn.myanimelist.net/images/anime/2/88336l.jpg"
                }
            },
            "num_recommendations": 29
        },
        {
            "node": {
                "id": 24833,
                "title": "Ansatsu Kyoushitsu",
                "main_picture": {
                    "medium": "https://api-cdn.myanimelist.net/images/anime/5/75639.jpg",
                    "large": "https://api-cdn.myanimelist.net/images/anime/5/75639l.jpg"
                }
            },
            "num_recommendations": 27
        },
        {
            "node": {
                "id": 20,
                "title": "Naruto",
                "main_picture": {
                    "medium": "https://api-cdn.myanimelist.net/images/anime/13/17405.jpg",
                    "large": "https://api-cdn.myanimelist.net/images/anime/13/17405l.jpg"
                }
            },
            "num_recommendations": 25
        },
        {
            "node": {
                "id": 11061,
                "title": "Hunter x Hunter (2011)",
                "main_picture": {
                    "medium": "https://api-cdn.myanimelist.net/images/anime/11/33657.jpg",
                    "large": "https://api-cdn.myanimelist.net/images/anime/11/33657l.jpg"
                }
            },
            "num_recommendations": 21
        },
        {
            "node": {
                "id": 20583,
                "title": "Haikyuu!!",
                "main_picture": {
                    "medium": "https://api-cdn.myanimelist.net/images/anime/7/76014.jpg",
                    "large": "https://api-cdn.myanimelist.net/images/anime/7/76014l.jpg"
                }
            },
            "num_recommendations": 21
        },
        {
            "node": {
                "id": 9941,
                "title": "Tiger & Bunny",
                "main_picture": {
                    "medium": "https://api-cdn.myanimelist.net/images/anime/13/29466.jpg",
                    "large": "https://api-cdn.myanimelist.net/images/anime/13/29466l.jpg"
                }
            },
            "num_recommendations": 21
        },
        {
            "node": {
                "id": 33489,
                "title": "Little Witch Academia (TV)",
                "main_picture": {
                    "medium": "https://api-cdn.myanimelist.net/images/anime/13/83934.jpg",
                    "large": "https://api-cdn.myanimelist.net/images/anime/13/83934l.jpg"
                }
            },
            "num_recommendations": 18
        },
        {
            "node": {
                "id": 28999,
                "title": "Charlotte",
                "main_picture": {
                    "medium": "https://api-cdn.myanimelist.net/images/anime/12/74683.jpg",
                    "large": "https://api-cdn.myanimelist.net/images/anime/12/74683l.jpg"
                }
            },
            "num_recommendations": 13
        },
        {
            "node": {
                "id": 32182,
                "title": "Mob Psycho 100",
                "main_picture": {
                    "medium": "https://api-cdn.myanimelist.net/images/anime/8/80356.jpg",
                    "large": "https://api-cdn.myanimelist.net/images/anime/8/80356l.jpg"
                }
            },
            "num_recommendations": 10
        }
    ],
    "studios": [
        {
            "id": 4,
            "name": "Bones"
        }
    ],
    "statistics": {
        "status": {
            "watching": "82759",
            "completed": "1464638",
            "on_hold": "15730",
            "dropped": "16353",
            "plan_to_watch": "113874"
        },
        "num_list_users": 1693354
    }
}
*/