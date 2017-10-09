const pkg = require('../package.json');
require('chai').should();

const calculateRisk = require('../lib').calculateRisk;

describe('Risk Of Serious Recidivism Calculator', () => {
  describe('Contractual results set', () => {
    var data = {
      birthDate:(new Date(1997, 01, 01)),
      sex:0,
      pncId:'X558007 62',
      currentOffenceType:13,
      convictionDate:(new Date(2017, 01, 01)),
      sentenceDate:(new Date(2017, 01, 01)),
      sexualElement:1,
      strangerVictim:1,
      violentOffenceCategory:'',
      firstSanctionDate:(new Date(2017, 01, 01)),
      previousSanctions:4,
      violentSanctions:2,
      sexualOffenceHistory:0,
      mostRecentSexualOffence:(new Date(2017, 01, 01)),
      contactAdult:0,
      contactChild:1,
      indecentImage:0,
      paraphilia:0,
      murder:1,
      wounding:1,
      burglary:1,
      arson:1,
      endangerLife:1,
      kidnapping:1,
      firearmPossession:1,
      robbery:1,
      anyOtherOffence:0,
      oasysInterview:0,
      useWeapon:1,
      partner:1,
      accommodation:2,
      employment:0,
      relationship:1,
      domesticViolence:1,
      currentUseOfAlcohol:0,
      bingeDrinking:0,
      impulsivity:0,
      temper:0,
      proCriminal:0,
      assessmentDate:(new Date(2017, 01, 01))
    };

    var result = calculateRisk(data);

    it('should include package version number in results', () => {
      result.should.have.property('calculatorVersion');
      result.calculatorVersion.should.equal(pkg.version);
    });

    it('should include a OGRS3 rating', () => {
      result.should.have.property('OGRS3');
      result.OGRS3.should.have.property('result');
      result.OGRS3.result.should.eql([0.6900886498909201, 0.8204909229177275]);
    });

    it('should include a OGRS3 explaination object', () => {
      result.should.have.property('OGRS3');
      result.OGRS3.should.have.property('explain');
    });

    it('should include a OGRS3 Percentile Risk', () => {
      result.should.have.property('OGRS3PercentileRisk');
      result.OGRS3PercentileRisk.should.eql([69, 82]);
    });

    it('should include a OGRS4s rating', () => {
      result.should.have.property('OGRS4s');
      result.OGRS4s.should.equal(17);
    });

    it('should include a OGRS4s Risk Band', () => {
      result.should.have.property('OGRS4sRiskBand');
      result.OGRS4sRiskBand.should.equal('High');
    });

    it('should include a probability of Non Sexual Violence in results', () => {
      result.should.have.property('probabilityOfNonSexualViolence');
      result.probabilityOfNonSexualViolence.should.eql([0.016004517582510876, 0.028977173254641733]);
    });

    it('should include an Indecent Image Probability in results', () => {
      result.should.have.property('indecentImageProbability');
      result.indecentImageProbability.should.eql([0.00224, 0.003476]);
    });

    it('should include an Contact Sexual Probability in results', () => {
      result.should.have.property('contactSexualProbability');
      result.contactSexualProbability.should.eql([0.011093467174355201, 0.0200485088695911]);
    });

    it('should include an Risk of Serious Recidivism in results', () => {
      result.should.have.property('riskOfSeriousRecidivism');
      result.riskOfSeriousRecidivism.should.eql([0.029337984756866074, 0.05250168212423283]);
    });

    it('should include a RSR Percentile Risk', () => {
      result.should.have.property('RSRPercentileRisk');
      result.RSRPercentileRisk.should.eql([3, 5]);
    });

    it('should include a RSR Risk Band', () => {
      result.should.have.property('RSRRiskBand');
      result.RSRRiskBand.should.eql(['Low', 'Medium']);
    });
  });
});
