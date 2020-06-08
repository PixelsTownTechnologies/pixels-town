import React from "react";

export function Wave1(props) {
    return (<svg style={{marginTop: `-1000px`, zIndex: 205}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#f3f4f5" fillOpacity="1"
              d="M0,192L48,192C96,192,192,192,288,202.7C384,213,480,235,576,213.3C672,192,768,128,864,101.3C960,75,1056,85,1152,112C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"/>
    </svg>);
}

export function Wave2(props) {
    return (
        <svg style={{marginTop: `-1000px`, zIndex: 200}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#f3f4f5" fillOpacity="0.6"
                  d="M0,64L60,80C120,96,240,128,360,117.3C480,107,600,53,720,80C840,107,960,213,1080,234.7C1200,256,1320,192,1380,160L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"/>
        </svg>
    );
}

export function Wave3(props) {
    return (
        <svg style={{marginTop: `-1000px`, zIndex: 195}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#f3f4f5" fillOpacity="0.6"
                  d="M0,96L48,106.7C96,117,192,139,288,149.3C384,160,480,160,576,149.3C672,139,768,117,864,138.7C960,160,1056,224,1152,224C1248,224,1344,160,1392,128L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"/>
        </svg>
    );
}

export function Wave4(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#f3f4f5" fillOpacity="1" d="M0,288L1440,64L1440,0L0,0Z"/>
        </svg>
    );
}

export function MultipleWave(props) {
    return (
        <div style={{marginTop: props.marginTop}}>
            <Wave3/>
            <Wave1/>
        </div>
    );
}