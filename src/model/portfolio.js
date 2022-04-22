import PortfolioSliderItem from "../components/Portfolio/PortfolioSliderItem/PortfolioSliderItem";
import trmBannerImg from "../../src/assets/images/portfolio/trm-banner.png";
import trmBannerImg2 from "../../src/assets/images/portfolio/trm-banner-2.jpg";
import flowBannerImg from "../../src/assets/images/portfolio/flow-banner.png";
import flowBannerImg2 from "../../src/assets/images/portfolio/flow-banner-2.png";
import feebsBannerImg from "../../src/assets/images/portfolio/feebs-banner.png";
import feebsBannerImg2 from "../../src/assets/images/portfolio/feebs-banner-2.png";

const portfolioItems = [
  {
    id: "p1",
    name: "Feebs Studio",
    description: [
      `Feebs Studio is an independent well established design agency experienced in creating design solutions and
     strategies. They needed a brand revamp and a developer to bring their design vision into reality.`,
      `Through collaboration with their lead designer, I developed them a custom wordpress theme that closer matched their brand, and one
      they could be proud to call their own.`,
    ],
    url: "https://feebstudio.co.uk/",
    bannerImg: {
      img: feebsBannerImg,
      secondaryImg: feebsBannerImg2,
      alt: "",
    },
    stack: "wordpress",
    images: [],
  },
  {
    id: "p2",
    name: "Flow Electrical and Security",
    description: [
      `Flow Electrical & Security specialise in electrical and security services, providing trustworthy and honeset electricians throughout Kent. They required
      a brand new website that had a strong emphasis on trust and professionalism.`,
      `Through collaboration with my team we created them a custom wordpress theme, one that could build trust and bring in a wider audience.`,
    ],
    url: "https://www.flowelectricalandsecurity.co.uk/",
    bannerImg: {
      img: flowBannerImg,
      secondaryImg: flowBannerImg2,
      alt: "Flow Electrical & Security homepage",
    },
    stack: "wordpress",
  },
  {
    id: "p3",
    name: "TRM Recruitment",
    description: [
      `TRM Recruitment is a leading provider of recruitment to recruitment services to 
    the UK and international recruitment community. They required a new website and a stronger established brand identity.
    Working in partnership with a graphic designer, we created a inviting and professional website to closer represent
    their image.`,
      `I built them a bespoke custom theme on WordPress with a strong focus on speed and reponsivity. My most enjoyable challenge was
      building a custom plugin to communicate with their job management system via API to populate the site with their active job listings.`,
    ],
    url: "https://trmrecruitment.com/",
    bannerImg: {
      img: trmBannerImg,
      secondaryImg: trmBannerImg2,
      alt: "TRM Recruitment homepage",
    },
    stack: "wordpress",
  },
];

export { portfolioItems };

export default portfolioItems.map((item) => ({
  id: item.id,
  JSXElement: <PortfolioSliderItem key={item.id} item={item} />,
}));
