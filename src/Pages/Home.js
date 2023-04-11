

const Home = () => {

  let widthToSet = window.visualViewport.width <= 700 ? "100%" : "700px";

  return (
    <div className="home">
      <h2 className="page-title">Welcome</h2>
      <div className="content" style={{maxWidth: widthToSet}}>
        <p><i>A motivated software developer with a passion for solving problems with real world applications.</i></p>
        <p>With a master’s degree in computer science, 4 years academic experience and almost 2 years
          professional experience in the software industry, I am a multi-skilled and adaptable developer
          with knowledge of both front-end and back-end languages and technologies. I am keen to
          continue developing these skills and put my abilities to use in helping people and companies.</p>
        <p>This website was created by me using react and hosted by firebase.
          CV information is able to be added, removed, edited and reordered from on the site, post login.
          A demo page is included to show this functionality without requiring authentication.</p>
        <p>The source code for this website is available to view <a href="https://github.com/dan-turner-djt/React-CV-Website">here</a> </p>
      </div>
    </div>
  );
}
 
export default Home;