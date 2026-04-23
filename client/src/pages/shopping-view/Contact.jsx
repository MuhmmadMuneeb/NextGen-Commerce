import React, { useState } from "react";
import { Send, MapPin, Mail, Phone } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { sendEmail } from "../../store/email-slice/email";
const Contact = () => {
  const dispatch = useDispatch();
  const { isLoading, success, message, error } = useSelector(
    (state) => state.email
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "GENERAL_INQUIRY",
    message: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("All fields are required");
      return;
    }

    dispatch(sendEmail(formData)).then(() => {
      setFormData({
        name: "",
        email: "",
        subject: "GENERAL_INQUIRY",
        message: "",
      });
    })

  };

  return (
    <div className="min-h-screen bg-white text-black font-mono pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-0 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">

        {/* Sidebar */}
        <div className="md:col-span-2 bg-black text-white p-8 md:p-12 space-y-12">
          <div>
            <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-4 -skew-x-12">
              GET_IN_TOUCH
            </h1>
            <p className="text-zinc-400 text-sm">
              TRANSMIT YOUR MESSAGE TO THE MAIN SERVER.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1" size={24} />
              <div>
                <p className="font-black uppercase">Location_Base</p>
                <p className="text-zinc-400">Sargodha, Punjab, PK</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="mt-1" size={24} />
              <div>
                <p className="font-black uppercase">Email_Relay</p>
                <p className="text-zinc-400">muneeb.jsdev@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="mt-1" size={24} />
              <div>
                <p className="font-black uppercase">Secure_Line</p>
                <p className="text-zinc-400">+92 (SYSTEM_ENCRYPTED)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-3 bg-white p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-black/40">
                  User_Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border-2 border-black p-4 outline-none font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-black/40">
                  Email_Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-2 border-black p-4 outline-none font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-black/40">
                Subject_Line
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border-2 border-black p-4 outline-none font-bold"
              >
                <option>GENERAL_INQUIRY</option>
                <option>JOB_PROPOSAL</option>
                <option>SYSTEM_ERROR</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-black/40">
                Message_Payload
              </label>
              <textarea
                rows={6}
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border-2 border-black p-4 outline-none font-bold resize-none"
              ></textarea>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white p-6 font-black uppercase italic flex items-center justify-center gap-4"
            >
              {isLoading ? "SENDING..." : "EXECUTE_TRANSMISSION"}
              <Send size={20} />
            </button>

            {/* Feedback */}
            {success && <p className="text-green-600">{message}</p>}
            {error && <p className="text-red-600">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;