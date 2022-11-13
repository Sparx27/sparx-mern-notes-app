import './homeSection.css'

export default function HomeSection () {
  return (
    <div className='homeSection'>
      <h1>Welcome!</h1>
      <h3>This is my first full-stack project made from zero with:</h3>
      <ol>
        <li>React with React Router DOM and Axios</li>
        <li>Styled with React Bootstrap and vanilla CSS</li>
        <li>Node + Express for the backend with nodemon, ESLint + standard, bcrypt to hash passwords and JSON Web Token</li>
        <li>MongoDB + Mongoose to create the database</li>
      </ol>
      <p>Also, this project was deployed on Heroku in a monorepo, deploying the app and the api on the same repository.</p>
      <p>Hope you enjoy, and feel free to check my code on GitHub: link</p>
      <p><i>I would like to give special thanks to Midudev and Full Stack Open, I feel that I improved so much during their courses and then creating this project alone trying to use all the things they teach.</i></p>
    </div>
  )
}
