import React, { Component } from 'react';
import './../App.css';
import Header from './Header';
import Search from './Search';
import TableData from './TableData';
import AddUser from './AddUser';
import DataUser from './Data.json'; // sau nay la duong dan Api
//Dùng gói uuid: npm install uuid => để tạo mã id không trùng
const uuidv1 = require('uuid/v1');

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      showForm : false,
      data : [],
      searchText:'',
      editUserStatus:false,
      userEditObject:{}
    }
  }

  
  componentWillMount() {
    // kiểm tra có localstorage chưa
    console.log(localStorage.getItem('userData'));
    if (localStorage.getItem('userData') === null) {
      localStorage.setItem('userData', JSON.stringify(DataUser)); // Ban dầu gán bằng dữ liệu mẫu
    }else{
      var temp = JSON.parse(localStorage.getItem('userData'))
      this.setState({
        data: temp
      });
     
    }

    //Lưu vào storage/ dùng hàm mảng thành dạng chuổi đề đọc, vì localstorage: lưu dạng key -value
    //localStorage.setItem('userData',JSON.stringify(DataUser))
  }
  

  // Ham hien thị form edit
  changeEditFormStatus = ()=>{
    this.setState({
      editUserStatus:!this.state.editUserStatus
    })
  }

  changeStatusGloble = ()=>{
    this.setState({
      showForm:!this.state.showForm
    })
  }
  // Hàm nhận các text nhập ở thẻ input ở search component
  getTextSearch = (data) =>{
    this.setState({
      searchText:data
    });
    console.log("Data App nhận từ search: " + data);
  }

  // Hàm nhận thông tin newUser từ addUser.js truyền qua bằng props
  getNewUserData = (name,tel,permission) => {
    //Đóng gói thông tin user thành 1 đối tượng
    var newUser={}
        newUser.id = uuidv1();
        newUser.name = name;
        newUser.tel = tel;
        newUser.permission = permission;
    var newUsers = this.state.data; // Tạo đối tượng để lưu thêm thông tin vào biến state data, nơi lưu tất cả user 
    newUsers.push(newUser);
    //Cập nhật lại biến state: data
    this.setState({ data:newUsers });
        console.log('Thông tin user mới tại App.js => nhận từ AddUser.js gửi qua (props):');
        console.log(this.state.data);
     // đẩy dữ liệu vào localstoger , nếu thật thì cập nhật vào db: gọi Api để cập nhật dữ liệu vào db
     localStorage.setItem('userData',JSON.stringify(newUsers));
  }

  // Hàm edit user 
  editUser = (user) => {
    console.log(user);
    this.setState({
      userEditObject: user
    });
    
  }

  getUserEditInfoApp = (info) => {
    //console.log(info);
    //Nhận được data cập nhật vào state, chỉ sử lý logic -> dùng hàm foreach, map: dùng khi có trả về
    this.state.data.forEach((value,key)=>{
      if (value.id === info.id) {
        value.id = info.id;
        value.name = info.name;
        value.tel = info.tel;
        value.permission = info.permission;
      }
    })
    // đẩy dữ liệu vào localstoger , nếu thật thì cập nhật vào db
    localStorage.setItem('userData',JSON.stringify(this.state.data)) 

  }
  // hàm nhận id user delete
  deleteUser = (idUser) => {
    //alert(idUser)
    // Cách xóa dùng hàm filter: thằng nào trùng thì tạo mảng mới bỏ thằng trùng ra
    //Nhanh hơn, nếu không thì phải foreach rồi if nếu id trùng thì xóa
    var tempData = this.state.data.filter(item => item.id !== idUser);
    this.setState({ data:tempData });
     // đẩy dữ liệu vào localstoger , nếu thật thì cập nhật vào db
     localStorage.setItem('userData',JSON.stringify(tempData))
  }
  
  //thongBao =()=>{ alert("ket noi ok");}
  render() {
    //Lưu vào storage/ dùng hàm mảng thành dạng chuổi đề đọc, vì localstorage: lưu dạng key -value
    //localStorage.setItem('userData',JSON.stringify(DataUser));

    //mảng lưu thông tin các tên tìm được
    var resultSearch =[];
    // so sánh với mảng user ở json
    //Khi không tìm thấy thì kq hàm indexOf = -1
    this.state.data.forEach( (item)=>{
      if (item.name.indexOf(this.state.searchText) !== -1) {
        resultSearch.push(item);
      }
    } )
    //console.log(resultSearch);

    return (
      <div>
        
        <Header/>
        <div className="searchForm">
          <div className="container">
            <div className="row">
              <Search 
                //Hiển thị form đăng ký User 
                ketNoi={()=>this.changeStatusGloble()} 
                showFormGloble={this.state.showForm}
                //Hàm liên kết với search
                checkConnectProps={(data)=>this.getTextSearch(data)}
                // Truyền biến trạng thái sang cho form sửa
                editUserStatus={this.state.editUserStatus}
                //Truyền hàm changeEditFormStatus
                changeEditFormStatus ={()=>this.changeEditFormStatus()}
                //
                userEditObject = {this.state.userEditObject}
                //Lấy thông tin từ search
                getUserEditInfoApp ={(info)=> this.getUserEditInfoApp(info)}
              />
              {/* <TableData dataUserProps={this.state.data}/>  */}
              {/* Xuất ra kết qur tìm kiếm . vì ban dầu không có từ khóa thì hiểu là khoản trắng, sẽ luôn có nên hiển thị hết */}
              <TableData 
                dataUserProps={resultSearch}
                // Truyền hàm edit User qua con (TableData)
                editUserProps={(user)=>this.editUser(user)}
                //Truyền hàm changeEditFormStatus
                changeEditFormStatus ={()=>this.changeEditFormStatus()}
                //Hàm lấy id từ TableData để xóa
                deleteUser ={(idUser)=>this.deleteUser(idUser)}
              /> 
              <AddUser 
                showFormGloble={this.state.showForm}
                //truyền thông tin user mới vào props
                addNewUser = {(name,tel,permission) => this.getNewUserData(name,tel,permission)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
