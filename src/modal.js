export default function Modal(props){
    console.log(props)
    const {data}=props;
    return <div className="modal">
        <div className="content">
            <button className="close" onClick={props.closeModal}>Close</button>
         <img src={data.thumbnailUrl} alt="Image"/>
                       
    <p>{data.title }</p>

    </div>
    </div>
}