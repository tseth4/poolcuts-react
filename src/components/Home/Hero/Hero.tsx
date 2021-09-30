import React, { useEffect, useState } from "react";
import pic1 from "@assets/pic1.jpg";
import pic2 from "@assets/pic2.jpg";
import "./Hero.scss";

interface HeroProps {}

const Hero: React.FC<HeroProps> = ({}) => {
  let imageClass1 = "hero-container__image";
  let imageClass2 = "hero-container__image";

  const [count, setCount] = useState({
    current: 0,
  });

  let slide: any;

  const images = [
    {
      title: "001",
      path: pic2,
    },
    {
      title: "002",
      path: pic1,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCount({ ...count, current: count.current + 1 });
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [count]);

  useEffect(() => {
    if (count.current == images.length) {
      setCount({ ...count, current: 0 });
    }
  }, [count]);

  if (count.current == 0) {
    slide = (
      <React.Fragment>
        <img key={Math.random()} className={imageClass1} src={images[0].path} />
      </React.Fragment>
    );
  } else if (count.current == 1) {
    slide = (
      <React.Fragment>
        <img key={Math.random()} className={imageClass2} src={images[1].path} />
      </React.Fragment>
    );
  }
  return (
    <div className="hero-container">
      <div className="hero-container__element">{slide}</div>
      <div className="hero-container__element">
        <div className="hero-container__desc">
          <h1>SC STUDIOS</h1>
          <div className="hero-container__details">
            <div>fades</div>
            <div>|</div>
            <div>tapers</div>
            <div>|</div>
            <div>beards</div>
          </div>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae
            aperiam sapiente voluptatibus tenetur corporis facilis numquam
            beatae, impedit consequuntur praesentium veritatis. Esse veritatis
            incidunt consequuntur!
          </p>
          <a href="/services">
            <button className="hero-container__button">Get a haircut</button>
          </a>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default Hero;
