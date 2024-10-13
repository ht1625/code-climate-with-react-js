class AgreementList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns_title: this.props.defaultValues.columns_title || [],
            agreement_list: this.props.defaultValues.agreement_list || [],
            lang: this.props.defaultValues.lang || "TR",
            location_plant_list: this.props.defaultValues.location_plant_list || [],
            file_list_idx: this.props.defaultValues.file_list_idx || [],
            is_master: this.props.defaultValues.is_master || 0,
            value_new_page: this.props.defaultValues.value_new_page,
            user_id: this.props.defaultValues.user_id || 0,
            is_plus: 1
        };
    }

    render() {

        const { columns_title, agreement_list, lang, location_plant_list, file_list_idx, is_master, user_id, is_plus  } = this.state;
        const sortable_columns = ['Anlaşma No', 'Anlaşma Oluşturma Tarihi', 'Müşteri Bilgisi', 'Proje Adı', 'İlk Sorumluluk Oranı', 'Belirlenen Sorumluluk Oranı', 'Parça Adeti', 'Anlaşma Onay Tarihi', 'Anlaşma Kayıt Tarihi'];
        const sortable_columns_en = ['Agreement No', 'Date of Treaty Creation', 'Customer Information', 'Project Name', 'First Liability Rate', 'Determined Responsibility Rate', 'Number of Pieces', 'Agreement Approval Date', 'Agreement Record Date'];
        const sortable_columns_idx = {
            0: 'analysis_confirmation_status',1: 'agreement_status',2: 'agreement_number',3: 'agreement_created_date',4: 'customer_party_id',5: 'related_plants',6: 'product_group_id',7: 'project_name',8: 'first_responsibility_rate',9: 'determined_responsibility_rate',10: 'piece_quantity',11: 'analyis_present_file_id',12: 'agreement_confirmation_date',13: 'agreement_created_date',14: 'actions'
        };
        const hidden_title_column_name_tr = ['İlk Sorumluluk Oranı', 'Belirlenen Sorumluluk Oranı', 'Parça Adeti', 'Anlaşma Onay Tarihi', 'Anlaşma Kayıt Tarihi'];
        const hidden_title_column_name_en = ['First Liability Rate', 'Determined Responsibility Ratio', 'Number of Pieces', 'Agreement Approval Date', 'Agreement Record Date'];
        const border_visible_column_name = ['Anlaşma Kayıt Tarihi', 'Agreement Record Date'];
        const hiddenColumn = {
            display: is_plus === 1 ? "none" : "table-cell"
        };

        const handleAddClick = () => {
            this.setState(prevState => ({
                is_plus: prevState.is_plus === 1 ? 0 : 1
            }));
        };

        // delete process
        const handleDelete = (e, agreement_id) => {
            e.preventDefault();
            var message_alert = "Bu işlemi yapmak istediğinize emin misiniz?";
            if(lang == "EN"){
                message_alert = "Are you sure you want to do this operation?";
            }
            const confirmed = window.confirm(message_alert);
            if (confirmed) {
              window.location.href = `/warrantly/refund/agreement/delete/${agreement_id}`;
            }
        };

        return (
            <table className="table table-responsive" style={{ lineHeight: 'unset', maxWidth: '100%', height: '500px' }}>
                <thead>
                    <tr className="text-center">
                        {columns_title.map((item, index) => {
                        const isHidden = hidden_title_column_name_tr.includes(item) || hidden_title_column_name_en.includes(item);
                        const isBorderRight = border_visible_column_name.includes(item);
                        const html_value = (
                            <th
                            key={index}
                            style={{ 
                                borderTop: 'none', 
                                fontSize: '11px', 
                                fontWeight: '500',
                                position: 'sticky', 
                                top: '0', 
                                backgroundColor: 'white',
                                zIndex: '1',
                                ...(isHidden ? hiddenColumn : {}),
                                borderRight: isBorderRight ? "1px solid #949494" : "",
                            }}
                            onClick={() => {
                                if (sortable_columns.includes(item) || sortable_columns_en.includes(item)) {
                                newPage(
                                    sortable_columns_idx[index],
                                    value_new_page.sortDirection,
                                    value_new_page.page,
                                    value_new_page.totalPage
                                );
                                }
                            }}
                            >
                            {item}
                            {(sortable_columns.includes(item) || sortable_columns_en.includes(item)) && (
                                <span>
                                <i className="mdi mdi-chevron-down"></i>
                                </span>
                            )}
                            </th>
                        );

                        if (item === "Analiz Sunumu" || item === "Analysis Presentation") {
                            return [
                            html_value,
                            <th 
                                key={`${index}-extra`}
                                style={{ 
                                borderLeft: '1px solid #949494', 
                                borderRight: is_plus === 1 ? "1px solid #949494" : "",
                                borderTop: '0',
                                borderBottom: is_plus === 0 ? "1px solid #ccc" : "1px solid #fff",
                                width: '1%',
                                textAlign: 'center',
                                padding: '0',
                                verticalAlign: 'middle',
                                position: 'sticky',
                                top: '0',
                                backgroundColor: 'white',
                                zIndex: '1',
                                fontSize: '11px',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                <button 
                                    onClick={handleAddClick} 
                                    style={{ 
                                    backgroundColor: 'transparent', 
                                    border: 'none', 
                                    cursor: 'pointer',
                                    padding: '0',
                                    outline: 'none'
                                    }}
                                >
                                    <i className={`mdi mdi-${is_plus === 1 ? 'plus' : 'minus'}-circle`} style={{ fontSize: '150%', color: '#555555' }}></i>
                                </button>
                                </div>
                            </th>
                            ];
                        } else {
                            return html_value;
                        }
                        })}
                    </tr>
                </thead>
                <tbody>
                    {agreement_list.map((agreement_detail, index) => (
                        <tr key={index}>
                            <td className="text-center"  style={{ fontSize: '11px'}}>
                                {getStatusIcon(agreement_detail.analysis_confirmation_status, lang)}
                            </td>
                            <td className="text-center"  style={{ fontSize: '11px'}}>
                                {getStatusText(agreement_detail.agreement_status, lang)}
                            </td>
                            <td className="text-center"  style={{ fontSize: '11px'}}>
                                {agreement_detail.agreement_number}
                            </td>
                            <td className="text-center"  style={{ fontSize: '11px'}}>
                                {new Date(agreement_detail.agreement_created_date).toISOString().slice(0, 16).replace('T', ' ')}
                            </td>
                            <td className="text-center"  style={{ fontSize: '11px'}}>
                                {agreement_detail.short_name}
                            </td>
                            <td className="text-center"  style={{ fontSize: '11px'}}>
                                {JSON.parse(agreement_detail.related_plants).map((plant, i) => (
                                    <span key={i} className="btn-soft-warning s-12">
                                        <i className="mdi mdi-circle-medium"></i> {location_plant_list[plant]}
                                    </span>
                                ))}
                            </td>
                            <td className="text-center"  style={{ fontSize: '11px'}}>
                                {lang === "TR" ? agreement_detail.description : agreement_detail.description_en}
                            </td>
                            <td className="text-center"  style={{ fontSize: '11px'}}>
                                {agreement_detail.project_name}
                            </td>
                            <td className="text-center"  style={{ fontSize: '11px'}}>
                                {generateDocument(file_list_idx[agreement_detail.analyis_present_file_id])}
                            </td>
                            <td className="text-center" style={{ width: '1%', 
                                borderLeft: '1px solid #949494', 
                                borderRight: is_plus === 1 ? "1px solid #949494" : "", 
                                borderBottom:  is_plus === 0 ? "1px solid #ccc" : "1px solid #fff", 
                                borderTop: '0'  }}>
                            </td>
                            <td className="text-center" style={{fontSize: '11px'}}>
                                {agreement_detail.first_responsibility_rate} %
                            </td>
                            <td className="text-center" style={{fontSize: '11px'}}>
                                {agreement_detail.determined_responsibility_rate} %
                            </td>
                            <td className="text-center" style={{fontSize: '11px'}}>
                                {agreement_detail.piece_quantity}
                            </td>
                            <td className="text-center" style={{fontSize: '11px'}}>
                                {agreement_detail.agreement_confirmation_date instanceof Date
                                    ? new Date(agreement_detail.agreement_confirmation_date).toISOString().slice(0, 16).replace('T', ' ')
                                    : '--'}
                            </td>
                            <td className="text-center" style={{
                                    ...hiddenColumn,
                                    fontSize: '11px',
                                    borderRight: is_plus === 0 ? "1px solid #949494" : ""
                                }}>
                                {agreement_detail.agreement_validity_date instanceof Date
                                    ? new Date(agreement_detail.agreement_validity_date).toISOString().slice(0, 16).replace('T', ' ')
                                    : '--'}
                            </td>
                            <td className="text-center">
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span className="icon-wrapper" style={{ backgroundColor: '#FFC107', width: '25px', height: '25px', lineHeight: '25px' }}>
                                        <a
                                            type="button"
                                            href={`/warrantly/refund/agreement/edit/${agreement_detail.agreement_id}`}
                                            style={
                                                (!(agreement_detail.analysis_confirmation_status !== "2" && (is_master == 1 || (parseInt(user_id) == parseInt(agreement_detail.fk_user_id))))
                                                )
                                                    ? { opacity: 0.6, cursor: 'not-allowed' }
                                                    : {}
                                            }
                                        >
                                            <i className="mdi mdi-pencil s-26" style={{ fontSize: '150%' }}></i>
                                        </a>
                                    </span>
                                    <span className="icon-wrapper icon-delete" style={{ width: '25px', height: '25px', lineHeight: '25px' }}>
                                        <a 
                                        href={is_master === 1 ? "#" : undefined} 
                                        onClick={is_master === 1 ? (e) => handleDelete(e, agreement_detail.agreement_id) : undefined}
                                        style={is_master !== 1 ? { opacity: 0.6, cursor: 'not-allowed' } : {}}>
                                        <i className="mdi mdi-delete s-26" style={{ fontSize: '150%' }}></i>
                                        </a>
                                    </span>
                                </span>
                            </td>
                        </tr>
                    ))}        
                </tbody>
            </table>
        );
    }
}