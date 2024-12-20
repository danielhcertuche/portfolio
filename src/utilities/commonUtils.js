import Home from "../PortfolioContainer/Home/Home";
import Projects from "../PortfolioContainer/Projects/Projects";
import About from "../PortfolioContainer/About/About";


export const TOTAL_SCREENS = [
    { screen_name: "home", component: Home },
    { screen_name: "about", component: About },
    { screen_name: "projects", component: Projects }, // Cambiado de 'services' a 'projects'
];

export const GET_SCREEN_INDEX = (screen_name) => {
    if(!screen_name){
        return -1;
    }

    for(let i=0; i < TOTAL_SCREENS.length; i++){
        if(TOTAL_SCREENS[i].screen_name === screen_name){
            return i;
        }
    }

    return -1;
}