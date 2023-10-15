import React, { useEffect, useState } from "react";
import "./sector.scss";
import { useApi } from "../../hooks/useApi";

import {
  TechBig,
  TechSmall,
  EngBig,
  EngSmall,
  HealthBig,
  HealthSmall,
} from "../images";

export default function sector() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [sectors, setSectors] = useState([]);
  const { get } = useApi();

  const handleSuccess = (res) => {
    setTitle(res.data.data.attributes.title);
    setSubTitle(res.data.data.attributes.subtitle);
    setSectors(res.data.data.attributes.sectors.data);
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
        {sectors.map((sector) => (
          <div key={sector.id} className="sector__wrap">
            <picture className="sector__picture">
              <source srcSet={TechBig} media="(min-width: 767px)" />
              <source srcSet={TechSmall} />
              <img src={TechSmall} alt="" />
            </picture>
            <div className="sector__name">Technology</div>
            <ul className="sector__list">
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
        ))}

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
