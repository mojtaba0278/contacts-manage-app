import Contact from "./Contact";
import { CURRENTLINE, ORANGE, PINK } from "../../helpers/colors";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";
const Contacts = ({Contacts,loading}) => {
  return (
    <>
      <section className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3">
                <Link to={'/Contacts/Add'} className="btn mx-2"  style={{ backgroundColor: PINK }}>
                  ساخت مخاطب جدید
                  <i className="fa fa-plus-circle mx-2" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      {loading? <Spinner/>:
      ( <section className="container">
      <div className="row">
     
        {/* Contact */}
        {
           Contacts.length>0
           ? Contacts.map((c)=><Contact key={c.id} Contact={c} />
          )
          :(
              <div className="text-center py-5" style={{backgroundColor:CURRENTLINE}}>
                  <p className="h3" style={{color:ORANGE}}>
                      مخاطب یافت نشد ...
                  </p>
<img src={require("../../assets/no-found.gif")} alt="یافت نشد" className="w-25" />
              </div>
          )
        }
        
      </div>
    </section>)}
     
    </>
  );
};

export default Contacts;