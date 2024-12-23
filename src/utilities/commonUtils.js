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

export const ExternalLinkIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="24"
        height="24"
        fill="currentColor"
    >
        <path d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-128c0-17.7-14.3-32-32-32L352 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z" />
    </svg>
);


export const EyeIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
        width="24"
        height="24"
        fill="currentColor"
    >
        <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
    </svg>
);

