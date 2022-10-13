import React, { useState } from "react";
import EditingTable from "./Table";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Regions from "./Regions";
import Education from "./Education";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MuiPhoneNumber from "material-ui-phone-number";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

function Form() {
  const dataArray = [];
  const [addFormData, setAddFormData] = useState({
    id: "",
    name: "",
    phone: "",
    region: "",
    bdate: dayjs(new Date()),
    wkExpereince: "",
    martialStatus: "",
    education: "",
    gender: "",
    email: "",
    linkedIn: "",
    university: "",
    universityStartDate: dayjs(new Date()),
    universityEndDate: dayjs(new Date()),
  });

  const [contacts, setContacts] = useState(dataArray);

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: contacts.length + 1,
      name: addFormData.name,
      phone: addFormData.phone,
      region: addFormData.region,
      bdate: addFormData.bdate,
      wkExpereince: addFormData.wkExpereince + " yil",
      martialStatus: addFormData.martialStatus,
      education: addFormData.education,
      gender: addFormData.gender,
      email: addFormData.email,
      linkedIn: addFormData.linkedIn,
      university: addFormData.university,
      universityStartDate: addFormData.universityStartDate,
      universityEndDate: addFormData.universityEndDate,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);

    setAddFormData({
      id: "",
      name: "",
      phone: "",
      region: "",
      bdate: dayjs(new Date()),
      wkExpereince: "",
      martialStatus: "",
      education: "",
      gender: "",
      email: "",
      linkedIn: "",
      university: "",
      universityStartDate: "",
      universityEndDate: "",
    });
  };

  const handleChange = (newValue) => {
    setAddFormData({
      ...addFormData,
      phone: newValue,
    });
  };

  return (
    <div className="app-container">
      <form onSubmit={handleAddFormSubmit} id="myForm" className="main-form">
        <h2 className="title">Ro'yxatdan o'tish</h2>
        <TextField
          className="each-field"
          size="small"
          id="outlined-basic"
          label="Ismingizni kiriting"
          variant="outlined"
          type="text"
          name="name"
          required="required"
          placeholder="Ismingizni kiriting..."
          value={addFormData.name}
          onChange={(e) =>
            setAddFormData({ ...addFormData, name: e.target.value })
          }
        />
        <TextField
          className="each-field"
          size="small"
          id="outlined-basic"
          label="Elektron pochtangizni kiriting"
          variant="outlined"
          type="email"
          name="email"
          required="required"
          placeholder="Elektron pochtangizni kiriting..."
          value={addFormData.email}
          onChange={(e) =>
            setAddFormData({ ...addFormData, email: e.target.value })
          }
        />
        <MuiPhoneNumber
          className="each-field"
          name="phone"
          label="Telefon raqamingizni kiriting"
          data-cy="user-phone"
          defaultCountry={"uz"}
          value={addFormData.phone}
          size="small"
          onChange={handleChange}
          variant="outlined"
        />
        <FormControl
          sx={{ minWidth: 195 }}
          size="small"
          required
          className="each-field"
        >
          <InputLabel id="demo-simple-select-label">
            Viloyatingizni tanlang
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Region"
            placeholder="Viloyatni tanlang"
            value={addFormData.region}
            onChange={(e) =>
              setAddFormData({ ...addFormData, region: e.target.value })
            }
          >
            {Regions.map((region) => (
              <MenuItem
                value={region.name_uz}
                inputProps={{ min: 0, style: { textAlign: "left" } }}
              >
                {region.name_uz}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs} className="each-field">
          <DesktopDatePicker
            size="small"
            label="Tug`ilgan kuningizni kiriting"
            inputFormat="YYYY/MM/DD"
            value={addFormData.bdate || null}
            onChange={(e) => {
              setAddFormData({ ...addFormData, bdate: e });
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <TextField
          className="each-field"
          size="small"
          id="outlined-basic"
          label="Ish tajribasi (yil)"
          type="number"
          name="score"
          required="required"
          placeholder="Ish tajribangizni umumiy yilini kiriting..."
          value={addFormData.wkExpereince}
          onChange={(e) =>
            setAddFormData({ ...addFormData, wkExpereince: e.target.value })
          }
        />
        <FormControl
          sx={{ minWidth: 195 }}
          size="small"
          required
          className="each-field"
        >
          <InputLabel id="demo-simple-select-label">Oilaviy ahvoli</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Oilaviy holat"
            placeholder="Oilaviy holatni tanlang"
            value={addFormData.martialStatus}
            onChange={(e) =>
              setAddFormData({ ...addFormData, martialStatus: e.target.value })
            }
          >
            <MenuItem value="Single">Uylanmagan</MenuItem>
            <MenuItem value="Married">Oilali</MenuItem>
            <MenuItem value="Divorced">Ajrashgan</MenuItem>
            <MenuItem value="Widowed">Beva</MenuItem>
            <MenuItem value="Other">Boshqa</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          sx={{ minWidth: 195 }}
          size="small"
          required
          className="each-field"
        >
          <InputLabel id="demo-simple-select-label">Ta`lim darajasi</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Education Level"
            placeholder="Please choose your education level"
            value={addFormData.education}
            onChange={(e) =>
              setAddFormData({ ...addFormData, education: e.target.value })
            }
          >
            {Education.map((edu) => (
              <MenuItem
                value={edu}
                inputProps={{ min: 0, style: { textAlign: "left" } }}
              >
                {edu}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="each-field">
          <FormLabel id="demo-row-radio-buttons-group-label">
            Jinsni tanlang
          </FormLabel>
          <RadioGroup
            row
            aligntItems="center"
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <FormControlLabel
              value="Ayol"
              control={<Radio />}
              label="Ayol"
              name="female"
              onChange={(e) =>
                setAddFormData({ ...addFormData, gender: e.target.value })
              }
            />
            <FormControlLabel
              value="Erkak"
              control={<Radio />}
              label="Erkak"
              name="male"
              onChange={(e) =>
                setAddFormData({ ...addFormData, gender: e.target.value })
              }
            />
          </RadioGroup>
        </FormControl>
        <TextField
          className="each-field"
          size="small"
          id="outlined-basic"
          label="LinkedIn linkini kiriting"
          variant="outlined"
          type="text"
          name="linkedIn"
          required="required"
          placeholder="LinkedIn linkini kiriting..."
          value={addFormData.linkedIn}
          onChange={(e) =>
            setAddFormData({ ...addFormData, linkedIn: e.target.value })
          }
        />
        <TextField
          className="each-field"
          size="small"
          id="outlined-basic"
          label="Eng so'ngi universitetingiz"
          variant="outlined"
          type="text"
          name="university"
          required="required"
          placeholder="Eng so`nggi universitetingiz nomini kiriting..."
          value={addFormData.university}
          onChange={(e) =>
            setAddFormData({ ...addFormData, university: e.target.value })
          }
        />
        <LocalizationProvider dateAdapter={AdapterDayjs} className="each-field">
          <DesktopDatePicker
            re
            size="small"
            label="Universtitetga kirgan sanasi"
            inputFormat="YYYY/MM/DD"
            value={addFormData.universityStartDate || null}
            onChange={(e) => {
              setAddFormData({ ...addFormData, universityStartDate: e });
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs} className="each-field">
          <DesktopDatePicker
            size="small"
            label="Universitetni tamomlagan sana"
            inputFormat="YYYY/MM/DD"
            value={addFormData.universityEndDate || null}
            onChange={(e) => {
              setAddFormData({ ...addFormData, universityEndDate: e });
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <Button variant="contained" color="success" type="submit">
          Topshirish
        </Button>
      </form>
      <EditingTable contacts={contacts} key={contacts} />
    </div>
  );
}

export default Form;
