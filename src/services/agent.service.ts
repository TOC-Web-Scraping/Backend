
import { Agent } from '../models';
import fetch from 'cross-fetch';
async function getAgentsService(search: string) {
        if (search === '' || search === 'undefined') {
            const response = await fetch('https://toc-web-scraping.github.io/scraping/data/agents.json');
            const agents: Agent[] = await response.json();
            await filerString(agents);
            return agents;
        } else {
            const response = await fetch('https://toc-web-scraping.github.io/scraping/data/agents.json');
            const agents: Agent[] = await response.json();
            
            const filteredAgents = agents.filter((agent) => {
            const abilities=agent.abilities[0].name.toLowerCase().includes(search.toLowerCase())||agent.abilities[1].name.toLowerCase().includes(search.toLowerCase())||agent.abilities[2].name.toLowerCase().includes(search.toLowerCase())||agent.abilities[3].name.toLowerCase().includes(search.toLowerCase());
                if(agent.country===null){
                    return agent.name.toLowerCase().includes(search.toLowerCase()) || agent.role.toLowerCase().includes(search.toLowerCase())||abilities;
               }
                return agent.name.toLowerCase().includes(search.toLowerCase())|| agent.country.toLowerCase().includes(search.toLowerCase()) || agent.role.toLowerCase().includes(search.toLowerCase()) ||abilities;
            });
            await filerString(filteredAgents);
            return filteredAgents;

        }
        return null;
}
async function getAgentByIdService(agentId:string ) {

        const response = await fetch('https://toc-web-scraping.github.io/scraping/data/agents.json');
        const agents: Agent[] = await response.json();
        await filerString(agents);
        const agent = agents.find(t => t.name === agentId);
        return agent;

}

async function filerString(agents:Agent[]){
    agents.forEach(agent => {
        agent.abilities.forEach(ability => {
            ability.topDescription=String(ability.topDescription).split(/(?:<.*?>)+|(?:\r\n|\r|\n)+|(?:\:)/gm) ;
            ability.topDescription=ability.topDescription.filter(function(str) {
                return /\S/.test(str);
            });
            ability.bottomDescription=ability.bottomDescription.replace(/<.*?>/gm,'')
        });;
    });
    
}
export default {
    getAgentsService,
    getAgentByIdService,

}