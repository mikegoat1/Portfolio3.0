import React from "react";
import { Image } from "react-bootstrap";
import image from "../../assets/HeroImg.jpg"

const styles = {
    ImgSize: {
        width: "517px",
        height: "456px",
    }
}


function HeroImg() {
    return (
        <Image style={styles.ImgSize} src={image} />
    );
}

export default HeroImg;