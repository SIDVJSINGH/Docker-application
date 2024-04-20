var {
  countryOption,
  StateOption,
  SportsOption,
  RaceOption,
  EthnicityOption,
  IncomeStatusOption,
  AthleticsStatusOption,
  PartyStatusOption,
} = require("../options.model");

module.exports = async () => {
  let countso = await StateOption.estimatedDocumentCount().exec();
  if (!countso) {
    await StateOption.create([
      {
        name: "Abruzzo",
        abbreviation: "ABZ",
      },
      {
        name: "Acre",
        abbreviation: "ACR",
      },
      {
        name: "Aguascalientes",
        abbreviation: "AGT",
      },
      {
        name: "Alabama",
        abbreviation: "ALB",
      },
      {
        name: "Alagoas",
        abbreviation: "ALG",
      },
      {
        name: "Alaska",
        abbreviation: "AKS",
      },
      {
        name: "Alberta",
        abbreviation: "ABT",
      },
      {
        name: "Amapá",
        abbreviation: "AMP",
      },
      {
        name: "Amazonas",
        abbreviation: "AMZ",
      },
      {
        name: "Andalusia",
        abbreviation: "AND",
      },
      {
        name: "Andhra Pradesh",
        abbreviation: "ANP",
      },
      {
        name: "Aosta Valley",
        abbreviation: "AVY",
      },
      {
        name: "Apulia",
        abbreviation: "ALA",
      },
      {
        name: "Aragon",
        abbreviation: "ARG",
      },
      {
        name: "Arizona",
        abbreviation: "ARZ",
      },
      {
        name: "Arkansas",
        abbreviation: "AKS",
      },
      {
        name: "Arunachal Pradesh",
        abbreviation: "ARH",
      },
      {
        name: "Assam",
        abbreviation: "ASS",
      },
      {
        name: "Asturias",
        abbreviation: "AST",
      },
      {
        name: "Australian Capital Territory",
        abbreviation: "ACT",
      },
      {
        name: "Auvergne-Rhône-Alpes",
        abbreviation: "ARA",
      },
      {
        name: "Baden-Württemberg",
        abbreviation: "BWG",
      },
      {
        name: "Bahia",
        abbreviation: "BAH",
      },

      {
        name: "Baja California Sur",
        abbreviation: "BCS",
      },
      {
        name: "Baja California",
        abbreviation: "BCA",
      },
      {
        name: "Balearic Islands",
        abbreviation: "BIS",
      },
      {
        name: "Basilicata",
        abbreviation: "BST",
      },
      {
        name: "Basque Country",
        abbreviation: "BCY",
      },
      {
        name: "Bavaria",
        abbreviation: "BVA",
      },
      {
        name: "Berlin",
        abbreviation: "BLN",
      },
      {
        name: "Bihar",
        abbreviation: "BIH",
      },
      {
        name: "Bourgogne-Franche-Comté",
        abbreviation: "BFC",
      },
      {
        name: "Brandenburg",
        abbreviation: "BDG",
      },
      {
        name: "Bremen",
        abbreviation: "BRN",
      },
      {
        name: "British Columbia",
        abbreviation: "BCI",
      },
      {
        name: "Brittany",
        abbreviation: "BTT",
      },
      {
        name: "Buenos Aires",
        abbreviation: "BAR",
      },
      {
        name: "Calabria",
        abbreviation: "CLI",
      },

      {
        name: "California",
        abbreviation: "CLA",
      },
      {
        name: "Campania",
        abbreviation: "CMA",
      },
      {
        name: "Campeche",
        abbreviation: "CMH",
      },

      {
        name: "Canary Islands",
        abbreviation: "CIS",
      },
      {
        name: "Cantabria",
        abbreviation: "CTB",
      },
      {
        name: "Castile and León",
        abbreviation: "CAL",
      },
      {
        name: "Castilla-La Mancha",
        abbreviation: "CLM",
      },
      {
        name: "Catalonia",
        abbreviation: "CLA",
      },
      {
        name: "Catamarca",
        abbreviation: "CTC",
      },
      {
        name: "Ceará",
        abbreviation: "CER",
      },
      {
        name: "Centre-Val de Loire",
        abbreviation: "CVD",
      },
      {
        name: "Chaco",
        abbreviation: "CHO",
      },
      {
        name: "Chhattisgarh",
        abbreviation: "CHH",
      },
      {
        name: "Chiapas",
        abbreviation: "CPS",
      },
      {
        name: "Chihuahua",
        abbreviation: "CIU",
      },
      {
        name: "Chubut",
        abbreviation: "CHU",
      },
      {
        name: "Coahuila",
        abbreviation: "COL",
      },
      {
        name: "Colima",
        abbreviation: "CIL",
      },
      {
        name: "Colorado",
        abbreviation: "CDO",
      },
      {
        name: "Connecticut",
        abbreviation: "CON",
      },
      {
        name: "Corrientes",
        abbreviation: "COK",
      },
      {
        name: "Corsica",
        abbreviation: "CRS",
      },
      {
        name: "Córdoba",
        abbreviation: "CBG",
      },
      {
        name: "Delaware",
        abbreviation: "DEW",
      },
      {
        name: "Delhi",
        abbreviation: "DEL",
      },
      {
        name: "Durango",
        abbreviation: "DUR",
      },
      {
        name: "Eastern Cape",
        abbreviation: "EAC",
      },
      {
        name: "Emilia-Romagna",
        abbreviation: "EMR",
      },
      {
        name: "England",
        abbreviation: "ENG",
      },
      {
        name: "Entre Ríos",
        abbreviation: "ENR",
      },
      {
        name: "Espírito Santo",
        abbreviation: "ESS",
      },
      {
        name: "Extremadura",
        abbreviation: "EXA",
      },
      {
        name: "Florida",
        abbreviation: "FLR",
      },
      {
        name: "Formosa",
        abbreviation: "FOR",
      },
      {
        name: "Free State",
        abbreviation: "FRS",
      },
      {
        name: "Friuli-Venezia Giulia",
        abbreviation: "FWG",
      },
      {
        name: "Galicia",
        abbreviation: "GAL",
      },
      {
        name: "Gauteng",
        abbreviation: "GAU",
      },
      {
        name: "Georgia",
        abbreviation: "GEO",
      },
      {
        name: "Goa",
        abbreviation: "GOA",
      },
      {
        name: "Goiás",
        abbreviation: "GOI",
      },
      {
        name: "Grand Est",
        abbreviation: "GAE",
      },
      {
        name: "Guanajuato",
        abbreviation: "GTO",
      },
      {
        name: "Guerrero",
        abbreviation: "GRR",
      },
      {
        name: "Gujarat",
        abbreviation: "GUJ",
      },
      {
        name: "Hamburg",
        abbreviation: "HAM",
      },
      {
        name: "Haryana",
        abbreviation: "HRA",
      },
      {
        name: "Hauts-de-France",
        abbreviation: "HDF",
      },
      {
        name: "Hawaii",
        abbreviation: "HWI",
      },
      {
        name: "Hesse",
        abbreviation: "HSS",
      },
      {
        name: "Hidalgo",
        abbreviation: "HID",
      },
      {
        name: "Himachal Pradesh",
        abbreviation: "HMP",
      },
      {
        name: "Idaho",
        abbreviation: "IDA",
      },
      {
        name: "Illinois",
        abbreviation: "ILL",
      },
      {
        name: "Indiana",
        abbreviation: "IND",
      },
      {
        name: "Iowa",
        abbreviation: "IOW",
      },
      {
        name: "Jalisco",
        abbreviation: "JAL",
      },
      {
        name: "Jharkhand",
        abbreviation: "JHK",
      },
      {
        name: "Jujuy",
        abbreviation: "JUJ",
      },
      {
        name: "Kansas",
        abbreviation: "KAN",
      },
      {
        name: "Karnataka",
        abbreviation: "KTK",
      },
      {
        name: "Kentucky",
        abbreviation: "KEN",
      },
      {
        name: "Kerala",
        abbreviation: "KRL",
      },
      {
        name: "KwaZulu-Natal",
        abbreviation: "KWN",
      },
      {
        name: "La Pampa",
        abbreviation: "LAP",
      },
      {
        name: "La Rioja",
        abbreviation: "LAR",
      },
      {
        name: "La Rioja",
        abbreviation: "LAR",
      },
      {
        name: "Lazio",
        abbreviation: "LAZ",
      },
      {
        name: "Liguria",
        abbreviation: "LIG",
      },
      {
        name: "Limpopo",
        abbreviation: "LMP",
      },
      {
        name: "Lombardy",
        abbreviation: "LOY",
      },
      {
        name: "Louisiana",
        abbreviation: "LOU",
      },
      {
        name: "Lower Saxony",
        abbreviation: "LWS",
      },
      {
        name: "Madhya Pradesh",
        abbreviation: "MHP",
      },
      {
        name: "Madrid",
        abbreviation: "MRD",
      },
      {
        name: "Maharashtra",
        abbreviation: "MAH",
      },
      {
        name: "Maine",
        abbreviation: "MAI",
      },
      {
        name: "Manipur",
        abbreviation: "MAN",
      },
      {
        name: "Manitoba",
        abbreviation: "MBA",
      },
      {
        name: "Maranhão",
        abbreviation: "MRH",
      },
      {
        name: "Marche",
        abbreviation: "MHE",
      },
      {
        name: "Maryland",
        abbreviation: "MYD",
      },
      {
        name: "Massachusetts",
        abbreviation: "MST",
      },
      {
        name: "Mato Grosso do Sul",
        abbreviation: "MGD",
      },
      {
        name: "Mato Grosso",
        abbreviation: "MTG",
      },
      {
        name: "Mecklenburg-Vorpommern",
        abbreviation: "MEV",
      },
      {
        name: "Meghalaya",
        abbreviation: "MGL",
      },
      {
        name: "Mendoza",
        abbreviation: "MEZ",
      },
      {
        name: "Mexico City",
        abbreviation: "MXC",
      },
      {
        name: "Michigan",
        abbreviation: "MCG",
      },
      {
        name: "Michoacán",
        abbreviation: "MCN",
      },
      {
        name: "Minas Gerais",
        abbreviation: "MSG",
      },
      {
        name: "Minnesota",
        abbreviation: "MNS",
      },
      {
        name: "Misiones",
        abbreviation: "MSN",
      },
      {
        name: "Mississippi",
        abbreviation: "MSS",
      },
      {
        name: "Missouri",
        abbreviation: "MSO",
      },
      {
        name: "Mizoram",
        abbreviation: "MIZ",
      },
      {
        name: "Molise",
        abbreviation: "MOL",
      },
      {
        name: "Montana",
        abbreviation: "MNT",
      },
      {
        name: "Morelos",
        abbreviation: "MLS",
      },
      {
        name: "Mpumalanga",
        abbreviation: "MPG",
      },
      {
        name: "Murcia",
        abbreviation: "MIC",
      },
      {
        name: "Nagaland",
        abbreviation: "NAG",
      },
      {
        name: "Navarre",
        abbreviation: "NAV",
      },
      {
        name: "Nayarit",
        abbreviation: "NAY",
      },
      {
        name: "Nebraska",
        abbreviation: "NEB",
      },
      {
        name: "Neuquén",
        abbreviation: "NEQ",
      },
      {
        name: "Nevada",
        abbreviation: "NEV",
      },
      {
        name: "New Brunswick",
        abbreviation: "NBK",
      },
      {
        name: "New Hampshire",
        abbreviation: "NHS",
      },
      {
        name: "New Jersey",
        abbreviation: "NEJ",
      },
      {
        name: "New Mexico",
        abbreviation: "NMX",
      },
      {
        name: "New South Wales",
        abbreviation: "NSW",
      },
      {
        name: "New York",
        abbreviation: "NEY",
      },
      {
        name: "Newfoundland and Labrador",
        abbreviation: "NFL",
      },
      {
        name: "Normandy",
        abbreviation: "NMY",
      },
      {
        name: "North Carolina",
        abbreviation: "NCL",
      },
      {
        name: "North Dakota",
        abbreviation: "NDA",
      },
      {
        name: "North Rhine-Westphalia",
        abbreviation: "NRW",
      },
      {
        name: "North West",
        abbreviation: "NWT",
      },
      {
        name: "Northern Cape",
        abbreviation: "NPE",
      },
      {
        name: "Northern Ireland",
        abbreviation: "NID",
      },
      {
        name: "Northern Territory",
        abbreviation: "NTY",
      },
      {
        name: "Nouvelle-Aquitaine",
        abbreviation: "NLA",
      },
      {
        name: "Nova Scotia",
        abbreviation: "NSI",
      },
      {
        name: "Nuevo León",
        abbreviation: "NLN",
      },
      {
        name: "Oaxaca",
        abbreviation: "OAX",
      },
      {
        name: "Occitanie",
        abbreviation: "OCC",
      },
      {
        name: "Odisha",
        abbreviation: "ODI",
      },
      {
        name: "Ohio",
        abbreviation: "OHI",
      },
      {
        name: "Oklahoma",
        abbreviation: "OKL",
      },
      {
        name: "Ontario",
        abbreviation: "ONT",
      },
      {
        name: "Oregon",
        abbreviation: "ORG",
      },
      {
        name: "Paraná",
        abbreviation: "PRN",
      },
      {
        name: "Paraíba",
        abbreviation: "PRB",
      },
      {
        name: "Pará",
        abbreviation: "PAR",
      },
      {
        name: "Pays de la Loire",
        abbreviation: "PDL",
      },
      {
        name: "Pennsylvania",
        abbreviation: "PNY",
      },
      {
        name: "Pernambuco",
        abbreviation: "PBC",
      },
      {
        name: "Piauí",
        abbreviation: "PAI",
      },
      {
        name: "Piedmont",
        abbreviation: "PDT",
      },
      {
        name: "Prince Edward Island",
        abbreviation: "PEI",
      },
      {
        name: "Provence-Alpes-Côte d'Azur",
        abbreviation: "PAC",
      },
      {
        name: "Puebla",
        abbreviation: "PBL",
      },
      {
        name: "Punjab",
        abbreviation: "PUN",
      },
      {
        name: "Quebec",
        abbreviation: "QUE",
      },
      {
        name: "Queensland",
        abbreviation: "QSL",
      },
      {
        name: "Querétaro",
        abbreviation: "QRT",
      },
      {
        name: "Quintana Roo",
        abbreviation: "QTR",
      },
      {
        name: "Rajasthan",
        abbreviation: "RJA",
      },
      {
        name: "Rhineland-Palatinate",
        abbreviation: "RHP",
      },
      {
        name: "Rhode Island",
        abbreviation: "RHI",
      },
      {
        name: "Rio Grande do Norte",
        abbreviation: "RGD",
      },
      {
        name: "Rio Grande do Sul",
        abbreviation: "RGS",
      },
      {
        name: "Rio de Janeiro",
        abbreviation: "RDJ",
      },
      {
        name: "Rondônia",
        abbreviation: "RND",
      },
      {
        name: "Roraima",
        abbreviation: "RRI",
      },
      {
        name: "Río Negro",
        abbreviation: "RGO",
      },
      {
        name: "Saarland",
        abbreviation: "SAA",
      },
      {
        name: "Salta",
        abbreviation: "SAL",
      },
      {
        name: "San Juan",
        abbreviation: "SAJ",
      },
      {
        name: "San Luis Potosí",
        abbreviation: "SLP",
      },
      {
        name: "San Luis",
        abbreviation: "SAL",
      },
      {
        name: "Santa Catarina",
        abbreviation: "STC",
      },
      {
        name: "Santa Cruz",
        abbreviation: "SCZ",
      },
      {
        name: "Santa Fe",
        abbreviation: "SAF",
      },
      {
        name: "Santiago del Estero",
        abbreviation: "SDE",
      },
      {
        name: "Sardinia",
        abbreviation: "SDI",
      },
      {
        name: "Saskatchewan",
        abbreviation: "SSC",
      },
      {
        name: "Saxony",
        abbreviation: "SXY",
      },
      {
        name: "Saxony-Anhalt",
        abbreviation: "SXA",
      },
      {
        name: "Schleswig-Holstein",
        abbreviation: "SWH",
      },
      {
        name: "Scotland",
        abbreviation: "SCT",
      },
      {
        name: "Sergipe",
        abbreviation: "SGP",
      },
      {
        name: "Sicily",
        abbreviation: "SLY",
      },
      {
        name: "Sikkim",
        abbreviation: "SKM",
      },
      {
        name: "Sinaloa",
        abbreviation: "SLA",
      },
      {
        name: "Sonora",
        abbreviation: "SNR",
      },
      {
        name: "South Australia",
        abbreviation: "SAU",
      },
      {
        name: "South Carolina",
        abbreviation: "SCL",
      },
      {
        name: "South Dakota",
        abbreviation: "SDT",
      },
      {
        name: "São Paulo",
        abbreviation: "SPO",
      },
      {
        name: "Tabasco",
        abbreviation: "TBS",
      },
      {
        name: "Tamaulipas",
        abbreviation: "TMP",
      },
      {
        name: "Tamil Nadu",
        abbreviation: "TMN",
      },
      {
        name: "Tasmania",
        abbreviation: "TSM",
      },
      {
        name: "Telangana",
        abbreviation: "TEL",
      },
      {
        name: "Tennessee",
        abbreviation: "TNS",
      },
      {
        name: "Texas",
        abbreviation: "TXS",
      },
      {
        name: "Thuringia",
        abbreviation: "THG",
      },
      {
        name: "Tierra del Fuego",
        abbreviation: "TDF",
      },
      {
        name: "Tlaxcala",
        abbreviation: "TLX",
      },
      {
        name: "Tocantins",
        abbreviation: "TCS",
      },
      {
        name: "Trentino-Alto Adige",
        abbreviation: "TAA",
      },
      {
        name: "Tripura",
        abbreviation: "TRP",
      },
      {
        name: "Tucumán",
        abbreviation: "TUC",
      },
      {
        name: "Tuscany",
        abbreviation: "TSY",
      },
      {
        name: "Umbria",
        abbreviation: "UMB",
      },
      {
        name: "Utah",
        abbreviation: "UTA",
      },
      {
        name: "Uttar Pradesh",
        abbreviation: "UTP",
      },
      {
        name: "Uttarakhand",
        abbreviation: "UTK",
      },
      {
        name: "Valencian Community",
        abbreviation: "VLC",
      },
      {
        name: "Veneto",
        abbreviation: "VNT",
      },
      {
        name: "Veracruz",
        abbreviation: "VCZ",
      },
      {
        name: "Vermont",
        abbreviation: "VMT",
      },
      {
        name: "Victoria",
        abbreviation: "VCT",
      },
      {
        name: "Virginia",
        abbreviation: "VRG",
      },
      {
        name: "Wales",
        abbreviation: "WAL",
      },
      {
        name: "Washington",
        abbreviation: "WSH",
      },
      {
        name: "West Bengal",
        abbreviation: "WSB",
      },
      {
        name: "West Virginia",
        abbreviation: "WSV",
      },
      {
        name: "Western Australia",
        abbreviation: "WAU",
      },
      {
        name: "Western Cape",
        abbreviation: "WSC",
      },
      {
        name: "Wisconsin",
        abbreviation: "WSN",
      },
      {
        name: "Wyoming",
        abbreviation: "WYG",
      },
      {
        name: "Yucatán",
        abbreviation: "YCN",
      },
      {
        name: "Zacatecas",
        abbreviation: "ZAC",
      },
      {
        name: "Île-de-France",
        abbreviation: "LLE",
      },
    ]);
  }
  let countsoc = await countryOption.estimatedDocumentCount().exec();
  if (!countsoc) {
    await countryOption.create([
      {
        name: "Argentina",
        abbreviation: "ARG",
      },
      {
        name: "Australia",
        abbreviation: "AUS",
      },
      {
        name: "Brazil",
        abbreviation: "BRZ",
      },
      {
        name: "Canada",
        abbreviation: "CND",
      },
      {
        name: "France",
        abbreviation: "FRN",
      },
      {
        name: "Germany",
        abbreviation: "GRM",
      },
      {
        name: "India",
        abbreviation: "IND",
      },
      {
        name: "Italy",
        abbreviation: "ITL",
      },
      
      {
        name: "Mexico",
        abbreviation: "MXC",
      },
      {
        name: "South Africa",
        abbreviation: "SAF",
      },
      {
        name: "Spain",
        abbreviation: "SPN",
      },
      
      {
        name: "UK",
        abbreviation: "UK",
      },
      {
        name: "USA",
        abbreviation: "USA",
      },
      
    ]);
  }
  let countsto = await SportsOption.estimatedDocumentCount().exec();
  if (!countsto) {
    await SportsOption.create([
      { label: "Athletics", value: "Athletics" },
      { label: "Baseball", value: "Baseball" },
      { label: "Basketball", value: "Basketball" },
      { label: "American football", value: "American football" },
      { label: "Soccer", value: "Soccer" },
      { label: "Ice hockey", value: "Ice hockey" },
      { label: "Tennis", value: "Tennis" },
      { label: "Golf", value: "Golf" },
      { label: "National Football League", value: "National Football League" },
      { label: "MLB", value: "MLB" },
      { label: "Boxing", value: "Boxing" },
      { label: "Hockey", value: "Hockey" },
      { label: "Motor Sports", value: "Motor Sports" },
      { label: "Others", value: "Others" },
    ]);
  }
  let countsro = await RaceOption.estimatedDocumentCount().exec();
  if (!countsro) {
    await RaceOption.create([
        { label: 'White/Caucasian', value: 'White/Caucasian' },
        { label: 'Asian', value: 'Asian' },
        { label: 'Hispanic', value: 'Hispanic' },
        { label: 'African American/Black', value: 'African American/Black' },
        { label: 'Other', value: 'Other' }
    ]);
  }
  let countseo = await EthnicityOption.estimatedDocumentCount().exec();
  if (!countseo) {
    await EthnicityOption.create([
        { label: 'Hispanic', value: 'Hispanic' },
        { label: 'Non -Hispanic', value: 'Non -Hispanic' }
    ]);
  }
  let countsiso = await IncomeStatusOption.estimatedDocumentCount().exec();
  if (!countsiso) {
    await IncomeStatusOption.create([
        { label: ' Less than $2,000', value: ' Less than $2,000' },
        { label: '$5,000 – $10,000', value: '$5,000 – $10,000' },
        { label: '$10,000 – $20,000', value: '$10,000 – $20,000' },
        { label: '$20,000 – $50,000', value: '$20,000 – $50,000' },
        { label: '$50,000 – $100,000', value: '$50,000 – $100,000' },
        { label: '$100,000 – $150,000', value: '$100,000 – $150,000' },
        { label: 'Above $150,000', value: 'Above $150,000' }
        
    ]);
  }
  let countsaso = await AthleticsStatusOption.estimatedDocumentCount().exec();
  if (!countsaso) {
    await AthleticsStatusOption.create([
        { label: 'Athletics1', value: 'Athletics1' },
        { label: 'Athletics2', value: 'Athletics2' },
        { label: 'Athletics3', value: 'Athletics3' },
        { label: 'Athletics4', value: 'Athletics4' }
    ]);
  }
  let countspso = await PartyStatusOption.estimatedDocumentCount().exec();
  if (!countspso) {
    await PartyStatusOption.create([
        { label: 'Party1', value: 'Party1' },
        { label: 'Party2', value: 'Party2' },
        { label: 'Party3', value: 'Party3' },
        { label: 'Party4', value: 'Party4' },
    ]);
  }

  return true;
};
