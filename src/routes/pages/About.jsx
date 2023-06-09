import React from 'react';
import { Typography, Button } from 'antd';
import { FaFacebookF, FaInstagram, FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { DownloadOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

function About() {
    return (
    <div className='about-page'>
        <Title level={2}>React-Cafe</Title>
        <Text>React-Cafe is a website for manage devices in any internet cafe. You can manage any type of the most popular devices like PC, PS4 and PS5. You can manage customer orders like drinks and food.</Text>
        <Text>in the end of day you can find all day activity in <Link to='/reports'>reports page</Link></Text>
        <Text style={{marginBottom: 20}}>I hope you are happy when you use my application</Text>
        <Text>You will find some problems when use like:</Text>
        <Text style={{paddingLeft: 10}}>1-Your Settings not saved and every time you open app you need to set it</Text>
        <Text style={{paddingLeft: 10}}>2-You can't use app without internet connection</Text>
        <Text style={{paddingLeft: 10, marginBottom: 20}}>3-Market itesm price & stowage not saved</Text>
        <Text>All of this problems solved in our Desktop Application "Electron-Cafe"</Text>
        <Text>You can download & try it now !!</Text>
        <a href='/application/win-setup.exe' download style={{ marginTop: 12, display: 'block' }}>
            <Button type="primary" icon={<DownloadOutlined />} >Download</Button>
        </a>
        <Title level={2} style={{marginTop: 40}}>About Me</Title>
        <Text>
        My name is Yousef Alaa,<br />
        I'm a Front-End Developer i worked in many sites and I made more Applications<br />
        I have more front end skills such Reactjs, Redux, CSS, HTML, SASS, Tailwind Css and more<br />
        if you need to work with me you can find me on upwork from <a href='https://www.upwork.com/freelancers/~018886b40a6cb208a1' target='_blank'>Here</a><br />
        or you can send email to <a style={{color: '#FFF', textDecoration: 'none'}} href="mailto:yousefalaa11223344@gmail.com">yousefalaa11223344@gmail.com</a>
        </Text>
        <div className="info-item">
            <Text>follow me</Text>
            <div className="social">
                <a href="https://www.facebook.com/Yousseef.Alaa/" target="_blank"><FaFacebookF /></a>
                <a href="https://github.com/Yousef-Alaa" target="_blank"><FaGithub /></a>
                <a href="https://www.linkedin.com/in/yousef-alaa-4b54021b2" target="_blank"><FaLinkedinIn /></a>
                <a href="https://www.instagram.com/yousef___alaa11/" target="_blank"><FaInstagram /></a>
            </div>
        </div>
    </div>
    );
}

export default About;