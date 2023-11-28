import { useApi } from "../hooks/useApi";

const sectorService = () => {
  const { get } = useApi();

  const fetchHomeSector = async (onSuccess) => {
    await get("home-sector", {
      onSuccess: onSuccess,
      params: {
        "populate[sectors][populate][categories][populate][jobs]": true,
        "populate[sectors][populate][smallimage]": true,
        "populate[sectors][populate][bigimage]": true,
        "populate[sectors][limit]": 3,
      },
    });
  };

  return {
    fetchHomeSector,
  };
};

export default sectorService;
