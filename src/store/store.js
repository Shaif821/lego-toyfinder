import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        ageChoice: null,
        interestChoice: null,
        themeChoice: null,

        isActiveTheme: false,
        currentSurvey: null,
        slideState: true, //De state van de slide, true = legosurvey + cardboard + screensaver


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
            {
                url: require('../assets/images/survey/group-44.png'),
                speech: require('../assets/images/layout/bitmap-small.png'),
                text: 'Bouwstenen',
                pos: '49px 50px 53px 50px'
            },
            {
                url: require('../assets/images/survey/group-34.png'),
                speech: require('../assets/images/layout/bitmap-small.png'),
                text: 'Ruimtevaart',
                pos: '49px 50px 53px 50px'
            },
        ],

        themes: [
            {
                url: require('../assets/images/themes/architecture.jpg'),
                brand: 'LEGO®',
                theme: 'Architecture'
            },
            {
                url: require('../assets/images/themes/batman.jpg'),
                brand: 'LEGO®',
                theme: 'Batman™'
            },
            {
                url: require('../assets/images/themes/batman_movie.jpg'),
                brand: 'LEGO®',
                theme: 'BATMAN™ MOVIE'
            },
            {
                url: require('../assets/images/themes/boost.jpg'),
                brand: 'LEGO®',
                theme: 'BOOST'
            },
            {
                url: require('../assets/images/themes/brickheadz.jpg'),
                brand: 'LEGO®',
                theme: 'BrickHeadz',
            },
            {
                url: require('../assets/images/themes/brickheadz_starwars.jpg'),
                brand: 'LEGO®',
                theme: 'BrickHeadz Star Wars',
            },
            {
                url: require('../assets/images/themes/city_fire_police.jpg'),
                brand: 'LEGO®',
                theme: 'City',
            },
            {
                url: require('../assets/images/themes/classic.jpg'),
                brand: 'LEGO®',
                theme: 'Classic'
            },
            {
                url: require('../assets/images/themes/creator_3in1.jpg'),
                brand: 'LEGO®',
                theme: 'Creator 3In1'
            },
            {
                url: require('../assets/images/themes/creator_expert.jpg'),
                brand: 'LEGO®',
                theme: 'Creator Expert'
            },
            {
                url: require('../assets/images/themes/disney.jpg'),
                brand: 'LEGO®',
                theme: 'Disney™'
            },
            {
                url: require('../assets/images/themes/duplo.jpg'),
                brand: 'LEGO®',
                theme: 'DUPLO®'
            },
            {
                url: require('../assets/images/themes/elves.jpg'),
                brand: 'LEGO®',
                theme: 'Elves'
            },
            {
                url: require('../assets/images/themes/friends.jpg'),
                brand: 'LEGO®',
                theme: 'Friends'
            },
            {
                url: require('../assets/images/themes/hp.jpg'),
                brand: 'LEGO®',
                theme: 'Harry Potter™'
            },
            {
                url: require('../assets/images/themes/juniors_jurassic-world.jpg'),
                brand: 'LEGO®',
                theme: 'Jurassic World™ Juniors',
            },
            {
                url: require('../assets/images/themes/jurrasic_world.jpg'),
                brand: 'LEGO®',
                theme: 'Jurassic World™'
            },
            {
                url: require('../assets/images/themes/lego_movie.jpg'),
                brand: 'LEGO®',
                theme: 'The Lego Movied™'
            },
            {
                url: require('../assets/images/themes/minecraft.jpg'),
                brand: 'LEGO®',
                theme: 'Minecraft™'
            },
            {
                url: require('../assets/images/themes/minifigures.jpg'),
                brand: 'LEGO®',
                theme: 'Minifigures'
            },
            {
                url: require('../assets/images/themes/ninjago.jpg'),
                brand: 'LEGO®',
                theme: 'NINJAGO®'
            },
            {
                url: require('../assets/images/themes/speed_champions.jpg'),
                brand: 'LEGO®',
                theme: 'Speed Champions'
            },
            {
                url: require('../assets/images/themes/spiderman.jpg'),
                brand: 'LEGO®',
                theme: 'Spiderman'
            },
            {
                url: require('../assets/images/themes/starwars.jpg'),
                brand: 'LEGO®',
                theme: 'Star Wars™'
            },
            {
                url: require('../assets/images/themes/superheroes_dc.jpg'),
                brand: 'LEGO®',
                theme: 'DC Comics Super Heroes'
            },
            {
                url: require('../assets/images/themes/superheroes_marvel-bp.jpg'),
                brand: 'LEGO®',
                theme: 'Marvel Super Heroes'
            },
            {
                url: require('../assets/images/themes/technic.jpg'),
                brand: 'LEGO®',
                theme: 'Technic'
            },
        ],
    },


    getters: {
        getLegoTheme(state) {
            return state.legoTheme
        },
    }
})
export default store;