import React, { Component } from 'react';
import EditUser from './EditUser';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state={
            tempValue:'',
            userObject:{}
        }
    }
    
    //Hàm đổi nút nhấn
    showButtonGloble = () =>{
        if (this.props.showFormGloble === true) {
            return  <div className="btn btn-block btn-outline-secondary" onClick={()=>this.props.ketNoi()}> Đóng lại </div>
        } else {
            return <div className="btn btn-block btn-outline-info"  onClick={()=>this.props.ketNoi()}> Thêm mới </div>
        }
    }
    //Hàm lấy giá trị trong thẻ input
    isChange = (event)=>{
        console.log(event.target.value);
        this.setState({
            tempValue:event.target.value
        });
        // tìm ngay lúc nhập, gọi hàm ở Bố để tìm dữ liệu luôn
        this.props.checkConnectProps(this.state.tempValue);
    }

    //Hàm đổi nút nhấn
    showEditForm = () =>{
        if (this.props.editUserStatus === true) {
            return  <EditUser 
                        changeEditFormStatus={()=>this.props.changeEditFormStatus()} 
                        userEditObject={this.props.userEditObject}
                        getUserEditInfo ={(info)=>this.getUserEditInfo(info)}
                    />
        }
    }
    //Hàm nhận thông tin editForm từ EditUser.js
    getUserEditInfo = (info) => {
        this.setState({
            userObject: info
        });
        this.props.getUserEditInfoApp(info);
    }

    

    render() {
        return (
                <div className="col-12">
                    {this.showEditForm()}

                    <div className="form-group">
                        <div className="btn-group">
                            <input onChange={(event)=>this.isChange(event)} style={{width: '1000px'}} type="text" className="form-control" placeholder="Nhập tên cần tìm" />
                            <div className="btn btn-info" onClick={(data)=>this.props.checkConnectProps(this.state.tempValue)}>Tìm</div>
                        </div>
                        <div className="form-group mt-2">
                        {this.showButtonGloble()}
                            
                        </div>
                    </div>
                    <hr />
                </div>
        );
    }
}

export default Search;