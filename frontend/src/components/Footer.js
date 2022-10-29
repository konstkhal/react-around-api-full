/**
 * @format done by Prettier
 * @function Footer returns Footer element
 *
 */

const Footer = () => {
  return (
    <footer className='footer'>
      <p className='footer__paragraph'>
        © {new Date().getFullYear()} Around The U.S.
      </p>
    </footer>
  );
};

export default Footer;
