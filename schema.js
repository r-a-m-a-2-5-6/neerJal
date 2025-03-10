const Joi = require('joi');

const dataSchema = Joi.object({
 
    surveyorName: Joi.string().allow(''),
    respondentName: Joi.string().allow(''),
    villageTown: Joi.string().allow(''),
    occupation: Joi.string().required(),
    gender: Joi.string().required(),
    age: Joi.number().required(),
    location: Joi.string().required(),
    qualification: Joi.string().required(),
    employment: Joi.string().required(),
    dailyWaterSource: Joi.string().required(),
    waterTreatment: Joi.string().required(),
    treatmentEntity: Joi.string().allow(''),
    pipedWater: Joi.string().required(),
    waterShortages: Joi.string().required(),
    shortageSeason: Joi.string().allow(''),
    dailyRiverUse: Joi.string().required(),
    riverLivelihood: Joi.string().required(),
    riverPayment: Joi.string().required(),
    paymentRecipient: Joi.string().allow(''),
    riverDrinking: Joi.string().required(),
    drinkTreatment: Joi.string().allow(''),
    domesticUse: Joi.string().required(),
    domesticPurpose: Joi.string().allow(''),
    irrigation: Joi.string().required(),
    cropImpact: Joi.string().allow(''),
    waterQualityChange: Joi.string().required(),
    qualityChangeDescription: Joi.string().allow(''),
    seasonalChange: Joi.string().required(),
    seasonDescription: Joi.string().allow(''),
    waterborneDisease: Joi.string().required(),
    diseaseTypes: Joi.string().allow(''),
    deadFishObservation: Joi.string().required(),
    fishSeason: Joi.string().allow(''),
    wastewaterStream: Joi.string().required(),
    streamLocations: Joi.string().allow(''),
    industryWasteEvidence: Joi.string().required(),
    industryWasteLocations: Joi.string().allow(''),
    fishDecline: Joi.string().required(),
    declinedSpecies: Joi.string().allow(''),
    animalDecline: Joi.string().required(),
    declinedBirdsAnimals: Joi.string().allow(''),
    illegalActivities: Joi.string().required(),
    illegalImpact: Joi.string().allow(''),
    regularSpecies: Joi.string().allow(''),
    disappearedSpecies: Joi.string().allow(''),
    livelihoodOptions: Joi.array().items(Joi.string()).required(),
    otherLivelihoodDetail: Joi.string().allow(''),
    fishingImportance: Joi.string().required(),
    catchDecrease: Joi.string().allow(''),
    earningsImpact: Joi.string().required(),
    businessImpact: Joi.string().required(),
    localMyths: Joi.string().required(),
    festivalsEvents: Joi.string().required(),
    traditionChanges: Joi.string().required(),
    traditionChangesDetail: Joi.string().allow(''),
    sacredSites: Joi.string().required(),
    sacredSitesDetail: Joi.string().allow(''),
    culturalImportance: Joi.string().required(),
    wastewaterDisposal: Joi.string().required(),
    drainageSystem: Joi.string().required(),
    maintenance: Joi.string().allow(''),
    stpsAvailable: Joi.string().required(),
    stpsFunctional: Joi.string().allow(''),
    industryWasteTreatment: Joi.string().required(),
    treatmentMethods: Joi.string().allow(''),
    sewageDischarge: Joi.string().required(),
    dischargeLocations: Joi.string().allow(''),
    householdWaste: Joi.array().items(Joi.string()).required(),
    garbageCollection: Joi.string().required(),
    regularClearing: Joi.string().allow(''),
    wasteSegregation: Joi.string().required(),
    categories: Joi.string().allow(''),
    plasticWaste: Joi.string().required(),
    sources: Joi.string().allow(''),
    marketWaste: Joi.string().required(),
    wasteType: Joi.string().allow(''),
    wasteFacility: Joi.string().required(),
    facilityFunctional: Joi.string().allow(''),
    awareness: Joi.string().required(),
    campaignDetails: Joi.string().allow(''),
    illegalDumping: Joi.string().required(),
    dumpingLocations: Joi.string().allow(''),
    wasteCollectionStatus: Joi.string().required(),
    riverChallenges: Joi.string().required(),
    improvementActions: Joi.string().required(),
    pollutionSources: Joi.string().required(),
    govProgramsAwareness: Joi.string().required(),
    localInitiatives: Joi.string().required(),
    willingnessParticipation: Joi.string().required(),
    photographsCompleted: Joi.string().required(),
    photographsRemarks: Joi.string().allow(''),
    videoInterviewsCompleted: Joi.string().required(),
    videoInterviewsRemarks: Joi.string().allow(''),
    contactName: Joi.string().allow(''),
    contactPhone: Joi.string().allow(''),
    regularUpdates: Joi.string().allow(''),

});

module.exports = dataSchema;
