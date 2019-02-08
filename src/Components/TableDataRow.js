import React, { Component } from 'react';

class TableDataRow extends Component {
    permissionShow = () => {
        if (this.props.permission === 1) { return "Admin";}
        else if (this.props.permission === 2) { return "Moderator";}
        else {return "Nomal User";}
    }

    //Gọi hàm edit user 
    editClick =()=>{
        this.props.editUserPropsClick();
        this.props.changeEditFormStatus();
    }
    deleteClick = (idUser) => {
      this.props.deleteButtonClick(idUser);
    }

    render() {
        return (
                <tr>
                    <td >{this.props.stt + 1}</td>
                    <td>{this.props.userName}</td>
                    <td>{this.props.tel}</td>
                    <td>{this.permissionShow()}</td>
                    <td>
                    <div className="btn-group">
                        <div className="btn btn-warning edit" onClick={()=>this.editClick()} > <i className="fa fa-edit    " /> Sửa </div>
                        <div className="btn btn-danger delete" onClick={(idUser)=>this.deleteClick(this.props.id)}> <i className="fa fa-delete" aria-hidden="true" />   Xóa </div>
                    </div>
                    </td>
                </tr>
       
        );
    }
}

export default TableDataRow;