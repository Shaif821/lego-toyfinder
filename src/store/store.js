import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        ageChoice: null,
        interestChoice: null,
        themeChoice: null,

        favorites: [],
        favoritesName: [],
        wishListUrl: null,

        loadSurvey: false,      //Of de survey geladen moet worden of niet       =====> Screensaver & product pagina                       : ScreenSaver & Product
        isActiveTheme: false,  //Checkt of het thema gedeelte actief is          =====> Wanneer de survey pagina wordt weergegeven         : ScreenSaver & Product

        slideState: 1,           //De state van de slide                         =====> welke state                                        : ELK

        currentSurvey: null,   //De huidige survey                               =====> De huidige survey die geladen moet worden          : Product
        legoSurveyStatus: true,  //Overslaan tekst bij de carboard component     =====> Wanneer de survey pagina weergegeven wordt         : Survey
        transitionSlide: false,  //De transitie van de survey slide              =====> Wanneer de producten pagina geladen wordt = true   : Survey

        surveyStream: null,

        ages: [
            {
                url: require('../assets/images/survey/group-107.png'),
                text: '1 - 3 jaar',
                ageMin: 1,
                ageMax: 3,
                interest: [],
                pos: '82px 103px 100px 94px'
            },
            {
                url: require('../assets/images/survey/group-43.png'),
                text: '3 - 6 jaar',
                ageMin: 2,
                ageMax: 6,
                interest: [
                    'Dieren', 'Fantasie', 'Stad & Gebouwen', 'Superhelden', 'Voertuigen'
                ],
                pos: '70px 80px 92px 77px'
            },
            {
                url: require('../assets/images/survey/group-34.png'),
                text: '6 - 12 jaar',
                ageMin: 6,
                ageMax: 12,
                interest: [
                    'Avontuur', 'Dieren', 'Fantasie', 'Robot', 'Ruimtevaart',
                    'Stad & Gebouwen', 'Superhelden', 'Voertuigen'
                ],
                pos: '78px 90px 87px 88px'
            },
            {
                url: require('../assets/images/survey/group-44.png'),
                text: '12+',
                ageMin: 12,
                ageMax: 99,
                interest:[
                    'Avontuur', 'Fantasie', 'Voertuigen',
                    'Ruimtevaart', 'Stad & Gebouwen', 'Superhelden'
                ],
                pos: '76px 68px 88px 66px'
            },
        ],

        interests: [
            {
                url: require('../assets/images/survey/adventure.png'),
                text: 'Avontuur',
            },
            {

                url: require('../assets/images/survey/animal.png'),
                text: 'Dieren',
            },
            {
                url: require('../assets/images/survey/fantasy.png'),
                text: 'Fantasie',
            },
            {
                url: require('../assets/images/survey/robot.png'),
                text: 'Robot',
            },
            {
                url: require('../assets/images/survey/city.png'),
                text: 'Stad & Gebouwen',
            },
            {

                url: require('../assets/images/survey/heroes.png'),
                text: 'Superhelden',
            },
            {
                url: require('../assets/images/survey/vehicles.png'),
                text: 'Voertuigen',
            },
            {
                url: require('../assets/images/survey/building.png'),
                text: 'Bouwstenen',
            },
            {
                url: require('../assets/images/survey/space.png'),
                text: 'Ruimtevaart',
            },
        ],

        themes: [
            {
                url: require('../assets/images/themes/architecture.jpg'),
                theme: 'Architecture'
            },
            {
                url: require('../assets/images/themes/batman.jpg'),
                theme: 'Batman™'
            },
            {
                url: require('../assets/images/themes/batman_movie.jpg'),
                theme: 'BATMAN™ MOVIE'
            },
            {
                url: require('../assets/images/themes/boost.jpg'),
                theme: 'BOOST'
            },
            {
                url: require('../assets/images/themes/brickheadz.jpg'),
                theme: 'BrickHeadz',
            },
            {
                url: require('../assets/images/themes/city_fire_police.jpg'),
                theme: 'City',
            },
            {
                url: require('../assets/images/themes/classic.jpg'),
                theme: 'Classic'
            },
            {
                url: require('../assets/images/themes/creator_expert.jpg'),
                theme: 'Creator Expert'
            },
            {
                url: require('../assets/images/themes/disney.jpg'),
                theme: 'Disney™'
            },
            {
                url: require('../assets/images/themes/duplo.jpg'),
                theme: 'DUPLO®'
            },
            {
                url: require('../assets/images/themes/elves.jpg'),
                theme: 'Elves'
            },
            {
                url: require('../assets/images/themes/friends.jpg'),
                theme: 'Friends'
            },
            {
                url: require('../assets/images/themes/hp.jpg'),
                theme: 'Harry Potter™'
            },
            {
                url: require('../assets/images/themes/jurrasic_world.jpg'),
                theme: 'Jurassic World™'
            },
            {
                url: require('../assets/images/themes/lego_movie.jpg'),
                theme: 'The Lego Movie™'
            },
            {
                url: require('../assets/images/themes/minecraft.jpg'),
                theme: 'Minecraft™'
            },
            {
                url: require('../assets/images/themes/ninjago.jpg'),
                theme: 'NINJAGO®'
            },
            {
                url: require('../assets/images/themes/speed_champions.jpg'),
                theme: 'Speed Champions'
            },
            {
                url: require('../assets/images/themes/starwars.jpg'),
                theme: 'Star Wars™'
            },
            {
                url: require('../assets/images/themes/superheroes_dc.jpg'),
                theme: 'DC Comics Super Heroes'
            },
            {
                url: require('../assets/images/themes/superheroes_marvel-bp.jpg'),
                theme: 'Marvel Super Heroes'
            },
            {
                url: require('../assets/images/themes/technic.jpg'),
                theme: 'Technic'
            },
        ],
    },
})
export default store;