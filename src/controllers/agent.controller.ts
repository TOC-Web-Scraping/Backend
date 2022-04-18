import { Request, Response } from 'express';
import { Agent } from '../models';
import fetch from 'cross-fetch';
import { Console } from 'console';

async function getAgents(req: Request, res: Response) {
    try {
        const search: string = String(req.query.search);
        if (search === '' || search === 'undefined') {
            const response = await fetch('https://toc-web-scraping.github.io/scraping/data/agents.json');
            const agents: Agent[] = await response.json();
            res.status(200).send(agents);
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
            res.status(200).send(filteredAgents);
        }

    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }

}

async function getAgentById(req: Request, res: Response) {
    try {
        const response = await fetch('https://toc-web-scraping.github.io/scraping/data/agents.json');
        const agents: Agent[] = await response.json();
        const agent = agents.find(t => t.name === req.params.id);
        if (agent) {
            res.status(200).send(agent);
        } else {
            res.status(404).send({ message: 'Agent not found' });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}
export default {
    getAgents,
    getAgentById,

}