import React, { Component } from 'react';
import TableDataRow from './TableDataRow';

class TableData extends Component {
    //
    deleteButtonClick = (idUser) => {
       // alert(idUser)
       this.props.deleteUser(idUser);
    }
    // hàm đẩy dữ liệu từ file json ra view
    mappingDataUser = () => this.props.dataUserProps.map((value,key) =>(
        <TableDataRow 
            editUserPropsClick ={(user)=> this.props.editUserProps(value)} 
            id={value.id} 
            userName={value.name} 
            key={key} stt={key} 
            tel={value.tel} 
            permission={value.permission}
            //Truyền hàm changeEditFormStatus
            changeEditFormStatus ={()=>this.props.changeEditFormStatus()}
            //Truyền cho TableDataRow
            deleteButtonClick = {(idUser)=>this.deleteButtonClick(idUser)}
        />
    ))
    
    render() {
        return (
            <div className="col">
                <table className="table table-striped table-inverse  table-hover">
                    <tbody>
                        <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Điện thoại</th>
                        <th>Quyền</th>
                        <th>Thao tác</th>
                    </tr>
                    </tbody><tbody>
                        {this.mappingDataUser()}
                    </tbody>
                </table>
                </div>

        );
    }
}

export default TableData;