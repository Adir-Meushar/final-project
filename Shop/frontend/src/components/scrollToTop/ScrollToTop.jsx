import { useEffect } from "react";
import { useLocation } from "react-router-dom"

// function ScrollToTop({ routesToScroll }) {
//     const {pathname }=useLocation();
//     useEffect(() => {
//         if (routesToScroll.includes(pathname )) {
//           window.scrollTo(0, 0);
//         }
//       }, [pathname , routesToScroll]);
//     return (
//         null
//     )
// }

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
export default ScrollToTop;
