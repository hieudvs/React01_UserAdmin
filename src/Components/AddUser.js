import React, { Component } from 'react';

class AddUser extends Component {
    // tạo contructor lưu biến trung gian
    constructor(props) {
        super(props);
        this.state = {
            //status_edit : false,
            //Tạo biến state để lưu tông tin người dùng nhập khi click vào nút thêm mới
            id:"",
            name:"",
            tel:"",
            permission:""
        }
    }
    changeStatus = () =>{
        this.setState({
            status_edit : !this.state.status_edit
        })
    }

    showButton = () =>{
        if (this.state.status_edit === true) {
            return <div className="btn btn-block btn-outline-secondary" onClick={() => this.changeStatus()}> Đóng lại </div>
        } else {
            return <div className="btn btn-block btn-outline-info" onClick={() => this.changeStatus()}> Thêm mới </div>
        }
    }
    showForm = () =>{
        if (this.state.status_edit === true) {
            return ( 
                <div className="card">
                    <div className="card border-primary mt-2">
                    <div className="card-header">Thêm nhân viên</div>
                    <div className="card-body text-primary">
                        <div className="form-group">
                        <input type="text" className="form-control" placeholder="Tên User" />
                        <input type="text"  className="form-control" placeholder="Điện thoại" />
                        </div>
                        <div className="form-group">
                        <select className="form-control" >
                            <option value>Chọn quyền mặc định</option>
                            <option value={1}>Admin</option>
                            <option value={2}>Modrator</option>
                            <option value={3}>Normal</option>
                        </select>
                        </div>
                        <div className="form-group">
                        <div className="btn btn-block btn-primary"> Thêm mới</div>
                        </div>
                    </div>
                    </div>
                </div>
            )}
    }

    //Cách tương tác giữ 2 component khác nhau thì thông qua thằng cha App.js
    checkDisplayForm = () =>{
        if (this.props.showFormGloble === true) {
            return ( 
            <div className="col-12">
                <div className="card">
                    <div className="card border-primary mt-2">
                    <div className="card-header">Thêm nhân viên</div>
                    <form method="post">
                        <div className="card-body text-primary">
                            <div className="form-group">
                            <input type="text" name="name" onChange={(event) => this.isChange(event) } className="form-control" placeholder="Tên User" required />
                            <input type="text" name="tel" onChange={(event) => this.isChange(event) } className="form-control" placeholder="Điện thoại" required />
                            </div>
                            <div className="form-group">
                            <select className="form-control" name="permission" onChange={(event) => this.isChange(event) } required>
                                <option value>Chọn quyền mặc định</option>
                                <option value={1}>Admin</option>
                                <option value={2}>Modrator</option>
                                <option value={3}>Normal</option>
                            </select>
                            </div>
                            <div className="form-group">
                                <input type="reset" className="btn btn-block btn-primary" 
                                    onClick={(name,tel,permission)=> 
                                        this.props.addNewUser(  this.state.name, 
                                                                this.state.tel, 
                                                                this.state.permission )} value="Thêm mới" />
                            </div>
                        </div>
                    </form>
                    </div>
                    </div>
                </div>
            )}
    }

    // Begin: Thêm mới User
    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        // console.log(name);
        // console.log(value);

        this.setState({
            [name]:value
        });
        // Đóng gói thông tin user thành 1 đối tượng
        // var newUser={}
        //     newUser.id = this.state.id;
        //     newUser.name = this.state.name;
        //     newUser.tel = this.state.tel;
        //     newUser.permission = this.state.permission;
        // console.log('Thông tin user mới:');
        // console.log(newUser);
    }

    render() {
        //console.log(this.state); // Kiểm tra trong 
        return (
            <div>
                {/* Gọi hàm hiển thị */}
                {/* {this.showButton()}
                {this.showForm()} */}
                {/* cách tương tác ở 2 component khác nhau */}
                {this.checkDisplayForm()}
        
            </div>
        );
    }
}

export default AddUser;