

const RecieptPopupModal = ({imgUrl}) => {


    return (
        <>
            <div className="modal fade" tabIndex="-1" id="recieptModal">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Reciept</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <img className="mw-100" src={imgUrl} alt="Reciept" />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
};

export default RecieptPopupModal;