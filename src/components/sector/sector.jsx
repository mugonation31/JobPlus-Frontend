import React, { useEffect, useState } from "react";
import "./sector.scss";
import { useApi } from "../../hooks/useApi";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function sector() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [sectors, setSectors] = useState([]);
  const { get } = useApi();

  const handleSuccess = (res) => {
    const {
      title,
      subtitle,
      sectors: { data: sectorArray },
    } = res.data.data.attributes;

    setTitle(title);
    setSubTitle(subtitle);
    setSectors(sectorArray);
  };

  const fetchHomeSector = async () => {
    await get("home-sector", {
      onSuccess: (res) => handleSuccess(res),
      params: {
        "populate[sectors][populate][categories][populate][jobs]": true,
        "populate[sectors][populate][smallimage]": true,
        "populate[sectors][populate][bigimage]": true,
      },
    });
  };

  useEffect(() => {
    fetchHomeSector();
  }, []);

  return (
    <div className="sector">
      <h2>{title}</h2>
      <p>{subtitle}</p>

      <div className="sector__types">
        {sectors.map((sector) => {
          const { title, bigimage, smallimage, categories } = sector.attributes;

          const { url: smallimageUrl } = smallimage.data.attributes;
          const { url: bigimageUrl } = bigimage.data.attributes;

          console.log("septor", categories);

          return (
            <div key={sector.id} className="sector__wrap">
              <picture className="sector__picture">
                <source
                  srcSet={`${BASE_URL}${bigimageUrl}`}
                  media="(min-width: 767px)"
                />
                <source srcSet={`${BASE_URL}${smallimageUrl}`} />
                <img src={`${BASE_URL}${smallimageUrl}`} alt="" />
              </picture>
              <div className="sector__name">{title}</div>
              <ul className="sector__list">
                {categories.data.map((category) => {
                  return (
                    <li key={category.id}>
                      <a href="">
                        {category.attributes.title}{" "}
                        <span>{category.attributes.jobs.data.length}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}

        <a href="">
          <div className="sector__browse">Browse all sectors</div>
        </a>

        <ul className="sector__mlist">
          <li>
            <a href="">
              Accountancy jobs <span>5, 757</span>
            </a>
          </li>
          <li>
            <a href="">
              Acturial jobs <span>5, 757</span>
            </a>
          </li>
          <li>
            <a href="">
              Admin, Secretarial jobs <span>5, 757</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
