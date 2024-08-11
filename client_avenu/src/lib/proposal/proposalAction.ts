'use server'

import { IProposal } from "@/types/proposal/proposal"
import { revalidateTag } from "next/cache"
import { getAuthAction } from "../auth/authAction"
import { IProposalView } from "@/types/proposal/proposalView"


export async function getProposals() {
    const response = await fetch('http://localhost:8001/api/proposals',
        {
            next: { tags: ['proposals'] }
        }
    )
    return await response.json()

}
export async function getProposalPlaces() {
    const response = await fetch('http://localhost:8001/api/proposal_places',
        {
            next: { tags: ['proposal_places'] }
        }
    )
    return await response.json()

}
export async function getProposalViews() {
    const response = await fetch('http://localhost:8001/api/proposal_views',
        {
            next: { tags: ['proposal_views'] }
        }
    )
    return await response.json()

}

export async function addProposal({ proposal }: { proposal: IProposal }) {

    try {

        const response = await fetch('http://localhost:8001/api/add_proposal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                params: {
                    proposal: proposal,
                }
            }),

        })
        revalidateTag('proposals')
        return await response.json()
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
        return 'An unexpected error occurred'
    }

}
export async function updateProposalViews({ model_id, proposal_views }: { model_id: number; proposal_views: IProposalView[] }) {

    try {
        const admin = await getAuthAction('AdminToken')

        if (admin.roles === 'None') {
            throw new Error('Не достаточно прав')
        }

        const response = await fetch('http://localhost:8001/api/update_proposal_views', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                params: {
                    model_id: model_id,
                    proposal_views: proposal_views,
                }
            }),

        })
        revalidateTag('proposal_views')
        return await response.json()
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
        return 'An unexpected error occurred'
    }

}