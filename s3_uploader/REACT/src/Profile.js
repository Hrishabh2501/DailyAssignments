import React from "react";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import {
  Container as ReactContainer,
  Row as ReactRow,
  Col as ReactCol,
  breakpointNext,
} from "react-grid";
import "./Profile.css";
import Toast from 'light-toast';

import Popup from "reactjs-popup";

const styles = {
  breakpoints: { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200 },
  containerMaxWidths: { sm: 540, md: 720, lg: 960, xl: 1140 },
  columns: 2,
  gutterWidth: 30,
};
export const Container = (props) => (
  <ReactContainer {...props} styles={styles} />
);
export const Row = (props) => <ReactRow {...props} styles={styles} />;
export const Col = (props) => <ReactCol {...props} styles={styles} />;

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: this.props.location.state.firstName,
      lastname: this.props.location.state.lastName,
      mail: this.props.location.state.email,
      submit: false,
      selectedFile: null,
      date: new Date(),
      dataList: []
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  async getdata() {
    let self = this


    let res =  await axios({
      method: "get",
      url: "http://localhost:8000/getData",
      params: { email: self.state.mail },
    })
    console.log(res)
   this.setState({dataList:res.data.data})
  console.log(this.state.dataList)
  }

  componentWillMount() {
  this.getdata()
  }

 async componentDidUpdate(prevProps,prevState)
  {
    if(prevState.dataList!==this.state.dataList)
    {
      this.setState({})
    }
    console.log(prevState,this.state.dataList)
  }

  handleLogout = async () => {

    let self = this;
    let res = await axios.post("http://localhost:8000/signout", {
      email: this.state.mail,
    });
    if (res.data.success) {
      console.log(res.data.message);
      ToastsStore.error(res.data.message);
      self.setState({
        submit: true,
        firstname: "",
        lastname: "",
        mail: "",
      });
      self.setState({ submit: true });
    }
  };



  onFileUpload = async (ev) => {
    ev.preventDefault();
    console.log(this.uploadInput.files.length)

    const data = new FormData();

    for (let i = 0; i < this.uploadInput.files.length; i++) {
      data.append('file', this.uploadInput.files[i]);
    }
    data.append('email', this.state.mail)
    data.forEach(element => {
      console.log(element)
    });

    let response = await axios.post("http://localhost:8000/upload", data)
    console.log(response)
    await this.getdata()
    console.log(this.state.dataList)
    
    }


  onDelete(item) {

    let self = this
    axios.post('http://localhost:8000/deleteData', {
      delete: item,
      email: self.state.mail
    })
      .then(function (response) {
        self.setState({ submit: false })
        console.log(response)

        axios({
          method: "get",
          url: "http://localhost:8000/getData",
          params: { email: self.state.mail },

        }).then(function (response) {
          console.log(response.data);
          self.setState({ dataList: response.data.data })
          console.log(self.state.dataList)
          self.setState({ submit: false })

        })
          .catch(function (response) {
            console.log(response);
          });

      })
      .catch(function (response) {
        console.log(response)
      })
  }

  render() {
    let uData = this.state.dataList

    return (

      <div>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container" style={{ textTransform: "uppercase" }}>
            <img src={process.env.PUBLIC_URL + '/aws-s3-icon.png'} style={{ blockSize: '1.5cm' }} alt='s3' />

            Welcome &nbsp;{" "}
            <b>
              <i>{this.state.firstname}</i>
            </b>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <div className="navbar-nav ml-auto">

                <Popup trigger={<button className="btn btn-primary btn-block">LOGOUT</button>} position="bottom left" >
                  <div style={{ textAlign: 'center' }}><i>ARE YOU SURE?</i></div>
                  <div style={{ textAlign: 'center' }}><button className="btn btn-primary" onClick={this.handleLogout} >Yes</button></div>
                </Popup>

                <ToastsContainer store={ToastsStore} />
              </div>
            </div>
          </div>
        </nav>

        <div className="profileHeader" >
          <form onSubmit={this.onFileUpload} onClick="this.form.reset()" >
            <div>

              UPLOAD FILE:{" "}
              <input
                type="file"
                multiple="true"
                className="btn btn-primary "
                id="uploader"
                accept=".png, .jpeg, .jpg, .pdf, .doc"
                ref={(ref) => {
                  this.uploadInput = ref;
                }}

              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button className="btn btn-primary">UPLOAD TO s3</button>
            </div>
          </form>
          <br></br>
          <br></br>
          <div>
            <div>
              <Container fluid className="cont">

                <Row className="rowHead">
                  <Col ><b>FILE NAME</b></Col>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     <Col ><b>FILE TYPE</b></Col>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Col ><b>FILE SIZE</b></Col>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Col ><b>UPLOADED ON</b></Col>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Col><b>ACTION</b></Col>
                </Row>

                {uData.map((item, key) =>
                  <Row className="rowData">
                    <Col >

                      <Popup trigger={<img src={item.file} style={{ blockSize: '1cm' }} alt=' your file'></img>} on='hover' position="right top">

                        <img src={item.file} style={{ blockSize: '10cm', border: '0.2cm solid black' }} alt=' your file'></img>
                      </Popup>
                      <span> {item.fName}</span></Col>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Col > {item.fType}</Col>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Col >{item.fSize}</Col>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Col >{item.fDate}</Col>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Col>
                      <a href={item.file}>
                        <img src={process.env.PUBLIC_URL + '/download.png'} style={{ blockSize: '0.5cm' }} alt='Download' /></a> &nbsp;&nbsp;
                    <Popup trigger={<img src={process.env.PUBLIC_URL + '/delete.png'} id="overlay" style={{ blockSize: '0.5cm' }} alt='Delete' />} on='hover' position="bottom right" >
                        <div style={{ textAlign: 'center' }}><i>ARE YOU SURE?</i></div>
                        <div style={{ textAlign: 'center' }}><button className="btn btn-primary" onClick={() => { this.onDelete(item.fName) }} >Yes</button></div>
                      </Popup>
                    </Col>
                  </Row>

                )}
              </Container>
            </div>
          </div>
        </div>
        {this.state.submit ? <Redirect to={`/signin`} /> : null}
      </div>
    );
  }
}

    // await axios({
    //   method: "get",
    //   url: "http://localhost:8000/getData",
    //   params: { email: self.state.mail },
    // }).then(function (response) {
    //   console.log(response.data);
    //   self.setState({ dataList: response.data.data })
    //   console.log(self.state.dataList)
    //   self.setState({ submit: false })
    // }).catch(function (response) {
    //   console.log(response);
    // });




        // await axios({
    //   method: "post",
    //   url: "http://localhost:8000/upload",
    //   data: data,
    //   headers: { "Content-Type": "multipart/form-data" },
    // })
    //   .then(function (response) {
        
    //     self.setState({ dataList: self.state.dataList })
    //     document.getElementById("uploader").value = "";
    //     self.getdata()
    //   })
    //   .catch(function (response) {
    //     console.log(response);
    //   });