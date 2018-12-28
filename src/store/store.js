import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        filterOptions: [],
        legoTheme: false,
        activateLoader: false,
        productRoute: null,
        productLoaded: null,
        ages: [
            {
                url: require('../assets/images/survey/group-107.png'),
                speech: require('../assets/images/layout/bitmap.png'),
                text: '1 - 2 jaar',
                pos: '82px 103px 100px 94px'
            },
            {

                url: require('../assets/images/survey/group-43.png'),
                speech: require('../assets/images/layout/bitmap.png'),
                text: '2 - 6 jaar',
                pos: '70px 80px 92px 77px'
            },
            {
                url: require('../assets/images/survey/group-34.png'),
                speech: require('../assets/images/layout/bitmap.png'),
                text: '6 - 12 jaar',
                pos: '78px 90px 87px 88px'
            },
            {
                url: require('../assets/images/survey/group-44.png'),
                speech: require('../assets/images/layout/bitmap.png'),
                text: '12+',
                pos: '76px 68px 88px 66px'
            },
        ],


        interests: [
            {
                url: require('../assets/images/survey/group-107.png'),
                speech: require('../assets/images/layout/bitmap-small.png'),
                text: 'Avontuur',
                pos: '49px 50px 53px 50px'
            },
            {

                url: require('../assets/images/survey/group-43.png'),
                speech: require('../assets/images/layout/bitmap-small.png'),
                text: 'Dieren',
                pos: '49px 50px 53px 50px'
            },
            {
                url: require('../assets/images/survey/group-34.png'),
                speech: require('../assets/images/layout/bitmap-small.png'),
                text: 'Fantasie',
                pos: '49px 50px 53px 50px'
            },
            {
                url: require('../assets/images/survey/group-44.png'),
                speech: require('../assets/images/layout/bitmap-small.png'),
                text: 'Roboto',
                pos: '49px 50px 53px 50px'
            },
            {
                url: require('../assets/images/survey/group-107.png'),
                speech: require('../assets/images/layout/bitmap-small.png'),
                text: 'Stad & gebouw',
                pos: '49px 50px 53px 50px'
            },
            {

                url: require('../assets/images/survey/group-43.png'),
                speech: require('../assets/images/layout/bitmap-small.png'),
                text: 'Superhelden',
                pos: '49px 50px 53px 50px'
            },
            {
                url: require('../assets/images/survey/group-34.png'),
                speech: require('../assets/images/layout/bitmap-small.png'),
                text: 'Voertuigen',
                pos: '49px 50px 53px 50px'
            },
            {
                url: require('../assets/images/survey/group-44.png'),
                speech: require('../assets/images/layout/bitmap-small.png'),
                text: 'Vrijetijd',
                pos: '49px 50px 53px 50px'
            },
        ],

        themes: [
            {
                url: require('../assets/images/themes/architecture.jpeg'),
                theme: 'Architecture'
            },
            {
                url: require('../assets/images/themes/batman_movie.jpeg'),
                theme: 'THE LEGO® BATMAN MOVIE'
            },
            {
                url: require('../assets/images/themes/boost.jpeg'),
                theme: 'BOOST'
            },
            {
                url: require('../assets/images/themes/brickheadz_starwars.jpeg'),
                theme: 'BrickHeadz',
                subTheme: 'Star wars'
            },
            {
                url: require('../assets/images/themes/city_arctic.jpeg'),
                theme: 'City',
                subTheme: 'Arctic'
            },
            {
                url: require('../assets/images/themes/classic.jpeg'),
                theme: 'Classic'
            },
            {
                url: require('../assets/images/themes/creator_3in1.jpeg'),
                theme: 'Creator3In1'
            },
            {
                url: require('../assets/images/themes/creator_expert.jpeg'),
                theme: 'Creator'
            },
            {
                url: require('../assets/images/themes/disney_tangled.jpeg'),
                theme: 'Disney'
            },
            {
                url: require('../assets/images/themes/duplo.jpeg'),
                theme: 'Duplo'
            },
            {
                url: require('../assets/images/themes/elves.jpeg'),
                theme: 'Elves'
            },
            {
                url: require('../assets/images/themes/friends_bigraceday_.jpeg'),
                theme: 'Friends'
            },
            {
                url: require('../assets/images/themes/hp.jpeg'),
                theme: 'Harry Potter'
            },
            {
                url: require('../assets/images/themes/juniors_jurassic-world.jpeg'),
                theme: 'Juniors',
                subTheme: 'Jurassic World'
            },
            {
                url: require('../assets/images/themes/jurrasic_world.jpeg'),
                theme: 'Jurassic World'
            },
            {
                url: require('../assets/images/themes/lego_pirates_caribbean.jpg'),
                theme: 'Pirates of the Caribbean'
            },
            {
                url: require('../assets/images/themes/mindstorms.jpeg'),
                theme: 'MINDSTORMS'
            },
            {
                url: require('../assets/images/themes/ninjago.jpeg'),
                theme: 'NINJAGO'
            },
            {
                url: require('../assets/images/themes/nocorners_ideas.jpeg'),
                theme: 'Ideas'
            },
            {
                url: require('../assets/images/themes/speed_champions.jpeg'),
                theme: 'Speed Champions'
            },
            {
                url: require('../assets/images/themes/starwars.jpeg'),
                theme: 'Star Wars'
            },
            {
                url: require('../assets/images/themes/superheroes_dc.jpeg'),
                theme: 'DC Comics Super Heroes'
            },
            {
                url: require('../assets/images/themes/superheroes_marvel-bp.jpeg'),
                theme: 'Marvel Super Heroes'
            },
            {
                url: require('../assets/images/themes/technic.jpeg'),
                theme: 'Technic'
            },
        ]
    },

    getters: {
        getLegoTheme (state){
            return state.legoTheme
        }
    }
})
export default store;