const data = {
    employmentStatus: {
        Employed: { label: "Employed", value: "Employed", score: 10 },
        UnEmployed: { label: "Unemployed", value: "UnEmployed", score: 0 },
        SelfEmployed: { label: "Self-Employed", value: "SelfEmployed", score: 10 },
        Retired: { label: "Retired", value: "Retired", score: 0 },
        Other: { label: "Other", value: "Other", score: 0 }
    },
    employmentIndustry: {
        Administrative: { label: "Administrative", value: "Administrative", score: 4 },
        Architecture: { label: "Architecture and Engineering", value: "Architecture", score: 0 },
        Arts: { label: "Arts, entertainment, sports and media", value: "Arts", score: 0 },
        Banking: { label: "Banking", value: "Banking", score: 10 },
        Cleaning: { label: "Cleaning and maintenance", value: "Cleaning", score: 0 },
        Community: { label: "Community and Social Services", value: "Community", score: 0 },
        Computers: { label: "Computers and Mathmatics", value: "Computers", score: 4 },
        Construction: { label: "Construction and Extraction", value: "Construction", score: 0 },
        Education: { label: "Education and Library", value: "Education", score: 0 },
        Farming: { label: "Farming, fishing, forestry", value: "Farming", score: 0 },
        Financial: { label: "Financial Operations", value: "Financial", score: 10 },
        Food: { label: "Food preparation and services", value: "Food", score: 0 },
        Government: { label: "Government Employees", value: "Government", score: 0 },
        Healthcare: { label: "Healthcare and medical", value: "Healthcare", score: 0 },
        Technical: { label: "IT and technical", value: "Technical", score: 0 },
        Installation: { label: "Installation and repair", value: "Installation", score: 0 },
        Legal: { label: "Legal", value: "Legal", score: 2 },
        Life: { label: "Life, physical and social science", value: "Life", score: 0 },
        Management: { label: "Management", value: "Management", score: 0 },
        Military: { label: "Military", value: "Military", score: 0 },
        Nurses: { label: "Nurses", value: "Nurses", score: 0 },
        Personal: { label: "Personal Care", value: "Personal", score: 0 },
        Production: { label: "Production", value: "Production", score: 0 },
        Protective: { label: "Protective Service", value: "Protective", score: 0 },
        Retail: { label: "Retail", value: "Retail", score: 0 },
        Sales: { label: "Sales", value: "Sales", score: 0 },
        Temporary: { label: "Temporary and seasonal", value: "Temporary", score: 0 },
        Transportation: { label: "Transportation and logistics", value: "Transportation", score: 0 },
        Other: { label: "Other", value: "Other", score: 0 }
    },
    employmentEducation: {
        Elementary: { label: "Elementary", value: "Elementary", score: 0 },
        Secondary: { label: "Secondary (High School)", value: "Secondary", score: 0 },
        Bachelor: { label: "Bachelor's Degree or equivalent", value: "Bachelor", score: 7 },
        Master: { label: "Master's Degree or equivalent", value: "Master", score: 8 },
        Doctorate: { label: "Doctorate", value: "Doctorate", score: 10 }
    },
    tradingExperience: {
        no: { label: "No experience", value: "no", score: 0 },
        small: { label: "Less than 1 year", value: "small", score: 5 },
        medium: { label: "1 to 3 years", value: "medium", score: 7 },
        large: { label: "Over 3 years", value: "large", score: 10 }
    },
    tradingLots: {
        no: { label: "I don't mind if I lose money", value: "no", score: 5 },
        tolerate: { label: "I can tolerate a loss", value: "tolerate", score: 5 },
        smallTolerate: { label: "I can tolerate a small loss", value: "smallTolerate", score: 4 },
        hardTolerate: { label: "I'd have a hard time tolerating any losses", value: "hardTolerate", score: 3 },
        see: { label: "I need to see at least a little return", value: "see", score: 2 },
        want: { label: "I don't want to lose any money", value: "want", score: 0 }
    },
    knowledgeRate: {
        small: { label: "€5,000", value: "small", score: 0 },
        medium: { label: "€10,000", value: "medium", score: 10 },
        large: { label: "€20,000", value: "large", score: 0 },
        largest: { label: "€50,000", value: "largest", score: 0 }
    },
    knowledgeMarket: {
        yes: { label: "True", value: "yes", score: 10 },
        no: { label: "False", value: "no", score: 0 }
    },
    knowledgeProfit: {
        yes: { label: "True", value: "yes", score: 10 },
        no: { label: "False", value: "no", score: 0 }
    },
    fundsSource: {
        Employment: { label: "Employment / Business Proceeds", value: "Employment", score: 5 },
        Savings: { label: "Savings / Investments", value: "Savings", score: 5 },
        Gifts: { label: "Gifts / Inheritance", value: "Gifts", score: 5 },
        Pension: { label: "Pension", value: "Pension", score: 5 },
        Government: { label: "Government support", value: "Government", score: 0 },
        Loan: { label: "Loan", value: "Loan", score: 3 },
        Social: { label: "Social security", value: "Social", score: 0 },
        Family: { label: "Family Financial Support", value: "Family", score: 0 },
        Severance: { label: "Severance", value: "Severance", score: 0 },
        Other: { label: "Other", value: "Other", score: 0 }
    },
    fundsIncome: {
        small: { label: "< €10,000", value: "small", score: 0 },
        medium: { label: "€10,001 - €50,000", value: "medium", score: 5 },
        large: { label: "€50,001 - €100,000", value: "large", score: 7 },
        largest: { label: "> €100,001", value: "largest", score: 10 }
    },
    fundsInvest: {
        small: { label: "< €10,000", value: "small", score: 0 },
        medium: { label: "€10,001 - €50,000", value: "medium", score: 5 },
        large: { label: "€50,001 - €100,000", value: "large", score: 7 },
        largest: { label: "> €100,001", value: "largest", score: 10 }
    }
};
export default data;