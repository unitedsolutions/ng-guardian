export default guardian => {
  let {pathname} = location;
  if(pathname !== '/') {
    guardian.redirectUrl = pathname;
  }
};
