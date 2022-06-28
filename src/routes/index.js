import routesConfig from '~/config/routes';
// layouts
import { HeaderOnly } from '~/components/Layouts';

// pages
import Following from '~/pages/Following';
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';

// unauthorized route
const publicRoutes = [
  { path: routesConfig.home, component: Home },
  { path: routesConfig.following, component: Following },
  { path: routesConfig.profile, component: Profile },
  { path: routesConfig.upload, component: Upload, layout: HeaderOnly },
  { path: routesConfig.search, component: Search, layout: null },
];

// unauthorized route
const privateRoutes = [];

export { publicRoutes, privateRoutes };
