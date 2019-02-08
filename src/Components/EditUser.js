import React, { Component } from 'react';

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state ={
            id: this.props.userEditObject.id,
            name: this.props.userEditObject.name,
            tel: this.props.userEditObject.tel,
            permission: this.props.userEditObject.permission
        }
    }
    
    isChangeEdit = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]:value});
    }

    //
    saveButton = () => {
        this.props.changeEditFormStatus(); // Ẩn form
        var info ={};
        info.id =this.state.id;
        info.name =this.state.name;
        info.tel =this.state.tel;
        info.permission =this.state.permission;
        this.props.getUserEditInfo(info);
    }

    render() {
        return (
            <div className="row">
            <div className="col-12">
            <div className="card">
                <div className="card border-primary mt-2">
                <div className="card-header text-center">Sửa thông tin nhân viên</div>
                <form method="post">
                    <div className="card-body text-white ">
                        <div className="form-group ">
                        <input type="text" onChange={(event)=>this.isChangeEdit(event)}
                            defaultValue={this.props.userEditObject.name} name="name" className="form-control" placeholder="Tên User" required />
                        <input type="text" onChange={(event)=>this.isChangeEdit(event)}
                            defaultValue={this.props.userEditObject.tel} name="tel"  className="form-control" placeholder="Điện thoại" required />
                        </div>
                        <div className="form-group">
                        <select onChange={(event)=>this.isChangeEdit(event)}
                            defaultValue={this.props.userEditObject.permission} className="form-control" name="permission" required>
                            <option value>Chọn quyền mặc định</option>
                            <option value={1}>Admin</option>
                            <option value={2}>Modrator</option>
                            <option value={3}>Normal</option>
                        </select>
                        </div>
                        <div className="form-group">
                            <input type="button" className="btn btn-block btn-primary" value="Xác nhận"
                                onClick={()=> this.saveButton()}
                            />
                        </div>
                    </div>
                </form>
                </div>
                </div>
            </div>
            </div>
        );
    }
}

export default EditUser;