/*********************************************************************************
*  WEB422 – Assignment 6
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Ron Agady Student ID: #168836211 Date: 2024-04-08
*
*  Vercel App (Deployed) Link: _____________________________________________________
*
********************************************************************************/ 


import { Inter } from "next/font/google";
import Image from 'react-bootstrap/Image';
import { Row, Col } from 'react-bootstrap'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Image src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" fluid rounded />
      <br/><br/>
      <Row>
        <Col md={6}>The Metropolitan Museum of Art, colloquially referred to as the Met, is an art museum in New York City. It is the largest art museum in the Americas and fourth-largest in the world. In 2022, the museum welcomed 3,208,832 visitors, making it the third-most visited museum in the United States and the eighth-most visited art museum in the world. In 2000, its permanent collection was said to have over two million works; it currently lists a total of 1.5 million objects. The collection is divided into 17 curatorial departments. The main building at 1000 Fifth Avenue, along the Museum Mile on the eastern edge of Central Park on Manhattan's Upper East Side, is by area one of the world's largest art museums. The first portion of the approximately 2-million-square-foot (190,000 m<sup>2</sup>) building was built in 1880. A much smaller second location, The Cloisters at Fort Tryon Park in Upper Manhattan, contains an extensive collection of art, architecture, and artifacts from medieval Europe.</Col>
        <Col md={6}>The Metropolitan Museum of Art was founded in 1870 with its mission to bring art and art education to the American people. The museum's permanent collection consists of works of art ranging from the ancient Near East and ancient Egypt, through classical antiquity to the contemporary world. It includes paintings, sculptures, and graphic works from many European Old Masters, as well as an extensive collection of American, modern, and contemporary art. The Met also maintains extensive holdings of African, Asian, Oceanian, Byzantine, and Islamic art. The museum is home to encyclopedic collections of musical instruments, costumes, and decorative arts and textiles, as well as antique weapons and armor from around the world. Several notable interiors, ranging from 1st-century Rome through modern American design, are installed in its galleries.</Col>
      </Row><br/><br/>
      Description of the Metropolitian Museum of Art taken straightly from the <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">Metropolitian Museum of Art Page</a> on wikipedia.
    </>
  );
}
