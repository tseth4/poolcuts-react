import pic1 from "@assets/pic1.jpg";
import pic2 from "@assets/pic2.jpg";
import React, { useEffect, useState } from "react";
import "./Hero2.scss";

export default function Hero2() {
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
        <h1>{images[0].title}</h1>
      </React.Fragment>
    );
  } else if (count.current == 1) {
    slide = (
      <React.Fragment>
        <img key={Math.random()} className={imageClass2} src={images[1].path} />
        <h1>{images[1].title}</h1>
      </React.Fragment>
    );
  }

  return (
    <div className="hero-container">
      <div className="hero-container__desc hero-box">{slide}</div>
      <div className="hero-container__info hero-box">
        <h1></h1>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
        optio consectetur eveniet itaque recusandae facere dolorum commodi
        perferendis facilis voluptas dignissimos reiciendis harum quis ipsa,
        ipsam unde, natus distinctio mollitia, aliquid excepturi exercitationem
        quaerat pariatur cumque. Ut, debitis facere veritatis, voluptatibus
        nesciunt aliquid cumque quia molestiae saepe quis voluptate ipsum amet
        ratione aspernatur, mollitia fugit.
        <div className="hero-container__services-container">
          <p></p>
        </div>
      </div>
    </div>
  );
}
