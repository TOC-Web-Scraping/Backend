import { AgentDocument } from '../models/agent.model';

function filterString(agents: AgentDocument[]) {
  return agents.map((agent) => {
    const tempAgent = agent;

    const abilities = agent.abilities.map((ability) => {
      const tempAbility = ability;

      let topDescriptionTemp = String(tempAbility.topDescription).split(/(?:<.*?>)+|(?:\r\n|\r|\n)+|(?::)/gm);
      topDescriptionTemp = topDescriptionTemp.filter((str) => /\S/.test(str));

      for (let i = 0; i < topDescriptionTemp.length; i += 1) {
        topDescriptionTemp[i] = topDescriptionTemp[i].replace(/^\s/gm, '');
      }

      let step = 0;
      const changeArrayToDict: { [key: string]: string } = {};
      while (step < topDescriptionTemp.length - 1) {
        changeArrayToDict[topDescriptionTemp[step]] = topDescriptionTemp[step + 1];
        step += 2;
      }
      tempAbility.topDescription = changeArrayToDict;
      tempAbility.bottomDescription = tempAbility.bottomDescription.replace(/<.*?>/gm, '');

      tempAbility.type = tempAbility.type.replace(/ <.*?>/gm, '');

      if (tempAbility.cost) {
        tempAbility.cost = tempAbility.cost.replace(/^\s/gm, '');
      }
      if (tempAbility.ultimateCost) {
        tempAbility.ultimateCost = tempAbility.ultimateCost.replace(/^\s/gm, '');
      }

      return tempAbility;
    });

    tempAgent.abilities = abilities;
    return tempAgent;
  });
}

export default { filterString };
