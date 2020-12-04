import * as ActionTypes from './ActionTypes';
import produce from 'immer';

const Options = produce((
    draft = {
        ui: {
            current: 'default',
            default: {
                home: {
                    linear_background: ['#17009c','#5c007a'],
                    bottom_tab_background: '#5c007a',
                    bottom_tab_color: '#fff',
                    top_tab_text_color: '#fff',
                    top_tab_indicator_color: '#fff',
                    card: 'rgba(255,255,255,0.6)',
                    text: 'black',
                    progress: '0,0,0'
                },
                anime: {
                    header_text_color: '#fff',
                    linear_background: ['#17009ca0','#5c007a'],
                    card: 'rgba(255,255,255,0.8)',
                    text: 'black',
                    title: 'black',
                    card_overlay: 'rgba(255,255,255,0.6)',
                    modal_background: 'rgba(255,255,255,0.8)'
                },
                setting: {
                    header_text_color: '#fff',
                    card: 'rgba(255,255,255,0.7)',
                    text: 'black'
                }
            },
            dark: {
                home: {
                    linear_background: ['#303030','#000','#000'],
                    bottom_tab_background: '#000',
                    bottom_tab_color: '#fff',
                    top_tab_text_color: '#fff',
                    top_tab_indicator_color: '#fff',
                    card: 'rgba(255,255,255,0.15)',
                    text: '#e0e0e0',
                    progress: '255,255,255'
                },
                anime: {
                    header_text_color: '#fff',
                    linear_background: ['#000000a0','#000','#000','#000'],
                    card: 'rgba(255,255,255,0.15)',
                    text: '#e0e0e0',
                    title: '#f7f7f7',
                    card_overlay: 'rgba(255,255,255,0.6)',
                    modal_background: 'rgba(0,0,0,0.7)'
                },
                setting: {
                    header_text_color: '#fff',
                    card: 'rgba(255,255,255,0.15)',
                    text: '#e0e0e0',
                }
            },
            sparkle : {
                home: {
                    linear_background: ['#ffffff','#6cfff8','#fba7ff'],
                    header_text_color: '#0b413e',
                    bottom_tab_color: '#000',
                    top_tab_text_color: '#0b413e',
                    top_tab_indicator_color: '#67cfca',
                    bottom_tab_background: '#fba7ff',
                    card: 'rgba(255,255,255,0.6)',
                    text: '#0B413E',
                    progress: '51,182,176',
                },
                anime: {
                    linear_background: ['rgba(255,255,255,0.3)', '#6cfff8','#fba7ff'],
                    header_text_color: '#000',
                    card: 'rgba(255,255,255,0.6)',
                    text: '#0B413E',
                    title: '#000',
                    card_overlay: 'rgba(255,255,255,0.6)',
                    modal_background: 'rgba(255,255,255,0.9)'
                },
                setting: {
                    header_text_color: '#0b413e',
                    card: 'rgba(255,255,255,0.15)',
                    text: '#0B413E'
                }
            },
            night_sky : {
                home: {
                    linear_background: ['#9bceff','#100071','#10083c'],
                    bottom_tab_background: '#10083c',
                    bottom_tab_color: '#fff',
                    top_tab_text_color: '#000',
                    top_tab_indicator_color: '#000',
                    card: 'rgba(0,0,0,0.6)',
                    text: '#EEF2F5',
                    progress: '255,255,255'
                },
                anime: {
                    linear_background: ['#100071','#10083c'],
                    card: 'rgba(0,0,0,0.6)',
                    header_text_color: '#fff',
                    text: '#EEF2F5',
                    title: '#E7DED4',
                    card_overlay: 'rgba(255,255,255,0.6)',
                    modal_background: 'rgba(0,0,0,0.7)'
                },
                setting: {
                    header_text_color: '#fff',
                    card: 'rgba(0,0,0,0.6)',
                    text: '#EEF2F5',
                }
            },
            old_autumn : {
                home: {
                    linear_background: ['#e9e0d1','#9e6c4a','#796751'],
                    top_tab_text_color: '#000',
                    top_tab_indicator_color: '#000',
                    bottom_tab_background: '#796751',
                    bottom_tab_color: '#fff',
                    card: 'rgba(0,0,0,0.6)',
                    text: '#F1EDE9',
                    progress: '#796751'
                },
                anime: {
                    header_text_color: '#fff',
                    linear_background: ['rgba(233,224,209,0.3)','#9e6c4a','#796751'],
                    card: 'rgba(0,0,0,0.6)',
                    text: '#F1EDE9',
                    title: '#E7DED4',
                    card_overlay: 'rgba(0,0,0,0.6)',
                    modal_background: 'rgba(0,0,0,0.7)'
                },
                setting: {
                    header_text_color: '#fff',
                    card: 'rgba(0,0,0,0.6)',
                    text: '#F1EDE9',
                }
            }
        }
    }, action) => {
        switch(action.type){
            case ActionTypes.CHANGE_THEME:
                draft.ui.current = action.payload
                return

            default:
                return draft
        }
    }
)

export default Options;