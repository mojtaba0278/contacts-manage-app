import { useEffect, useContext } from "react";
import {useImmer} from "use-immer"
import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik,Form,Field,ErrorMessage } from "formik";
import { contactSchema } from "../../validations/contactValidation";
import { ContactContext } from "../../context/contactContext";
import { getContact, updateContact } from "../../services/contactService";
import { Spinner } from "../";
import { COMMENT, ORANGE, PURPLE } from "../../helpers/colors";
import { toast } from "react-toastify";

const EditContact = () => {
  const { contactId } = useParams();
  const {
    setFilteredContacts,
    loading,
    setLoading,
    groups,
  } = useContext(ContactContext);

  const navigate = useNavigate();

  const [contact, setContact] = useImmer({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getContact(contactId);

        setLoading(false);
        setContact(contactData);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // const onContactChange = (event) => {
  //   setContact({
  //     ...contact,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  const submitForm = async (values) => {
    // event.preventDefault();
    try {
      setLoading(true);
     
      const { data, status } = await updateContact(values, contactId);

      /*
       * NOTE
       * 1- forceRender -> setForceRender(true)
       * 2- Send request server
       * 3- Update local state
       * 4- Update local state before sending request to server
       */

      if (status === 200) {
        setLoading(false);
toast.info("مخاطب با موفقیت ویرایش شد", {icon:"☠️"});
        // const allContacts = [...contacts];

        setContact(draft=>{const contactIndex = draft.findIndex(
          (c) => c.id === parseInt(contactId))
        
        draft[contactIndex] = { ...data }});


        
        // setContacts(allContacts);
        setFilteredContacts(draft=>{const contactIndex = draft.findIndex(
          (c) => c.id === parseInt(contactId))
        
        draft[contactIndex] = { ...data }});

        navigate("/contacts");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: ORANGE }}>
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: ORANGE }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <div className="col-md-8">
                <Formik 
                  
                  initialValues={{
                    fullname:contact.fullname,
                    photo:contact.photo,
                    mobile:contact.mobile,
                    email:contact.email,
                    job:contact.job,
                    group:contact.group,
                  }}
                  validationSchema={contactSchema}
                  onSubmit={(values)=>{
                        submitForm(values);
                  }}
                                  >
                
                  <Form >
                  <div className="mb-2">
                    <Field
                    name="fullname"
                      type="text"
                      // {...Formik.getFieldProps('fullname')}
                      className="form-control"
                      placeholder="نام و نام خانوادگی"
                      /* required={true} */
                    />
                    {/* {
                     Formik.touched.fullname && Formik.errors.fullname?(
                        <div className="text-danger">{Formik.errors.fullname}</div>
                      ): null
                    } */}
                  <ErrorMessage
                     name="fullname"
                     render={(msg)=>(<div className="text-danger">{msg}</div>)}
                     />  </div>
                  <div className="mb-2">
                    <Field
                    name="photo"
                      type="text"
                      className="form-control"
                      /* required={true} */
                      placeholder="آدرس تصویر"
                    />
                  <ErrorMessage
                     name="photo"
                     render={(msg)=>(<div className="text-danger">{msg}</div>)}
                     />  </div>
                  <div className="mb-2">
                    <Field
                    name="mobile"
                      type="number"
                      className="form-control"
                      /* required={true} */
                      placeholder="شماره موبایل"
                    />
                  <ErrorMessage
                     name="mobile"
                     render={(msg)=>(<div className="text-danger">{msg}</div>)}
                     />  </div>
                  <div className="mb-2">
                    <Field
                name="email"
                      type="email"
                      className="form-control"
                      /* required={true} */
                      placeholder="آدرس ایمیل"
                    />
                  <ErrorMessage
                     name="email"
                     render={(msg)=>(<div className="text-danger">{msg}</div>)}
                     />  </div>
                  <div className="mb-2">
                    <Field
                    name="job"
                      type="text"
                            className="form-control"
                      /* required={true} */
                      placeholder="شغل"
                    />
                     </div>
                  <div className="mb-2">
                    <Field
                    name="group"
                    as="select"
                      /* required={true} */
                      className="form-control"
                    >
                      <option value="">انتخاب گروه</option>
                      {groups.length > 0 &&
                        groups.map((group) => (
                          <option key={group.id} value={group.id}>
                            {group.name}
                          </option>
                        ))}
                    </Field>
                    <ErrorMessage
                     name="group"
                     render={(msg)=>(<div className="text-danger">{msg}</div>)}
                     />
                
                  </div>
                  <div className="mx-2">
                    <input
                      type="submit"
                      className="btn"
                      style={{ backgroundColor: PURPLE }}
                      value="ویرایش مخاطب"
                    />
                    <Link
                      to={"/contacts"}
                      className="btn mx-2"
                      style={{ backgroundColor: COMMENT }}
                    >
                      انصراف
                    </Link>
                  </div>
                </Form>
                                  </Formik>
                </div>
                <div className="col-md-4">
                  <img
                    src={contact.photo}
                    className="img-fluid rounded"
                    alt=""
                    style={{ border: `1px solid ${PURPLE}` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-1">
              <img
                src={require("../../assets/man-taking-note.png")}
                height="300px"
                alt=""
                style={{ opacity: "60%" }}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default EditContact;
