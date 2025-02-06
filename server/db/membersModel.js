import mongoose from "mongoose";

const membersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  surety: {
    type: String,
    required: true,
  },
  codeNumber: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["Individual", "EAAZ(AA)", "SAAZ(AA)", "SWAAZ(AA)", "WAAZ(AA)", "NAAZ(AA)", "IMMIGRATION(AA)", "CAAZ(AA)", "NR(AXUM)", "NR(ADIGRAT)", "NR(SHIRE)", "NR(ADWA)", "SR(HAWASSA)", "SR(SHASHEMENE)", "SER(ZEWAY)", "SER(ADAMA)", "NER(KOMBOLCHA)", "NER(DESSIE)", "CNR(DIBRE BRIHAN)", "CNR(FICHE)", "CNR(SULULTA)", "NEER(SEMERA)", "NEER(AWASH)", "SSWR(SODO)", "SSWR(ARBAMINCH)"],
    required: true,
  },
  educationalDocument: {
    type: String,
    required: true,
  },
  suretyDocument: {
    type: String,
    required: true,
  },
});

const Members = mongoose.models.Members || mongoose.model("Members", membersSchema);

export default Members;
