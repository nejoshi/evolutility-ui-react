// Evolutility-UI-React :: /views/many/Cards.js

// Cards view to display a collection as a set of Cards.

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2018 Olivier Giulieri

import React from 'react'
import PropTypes from 'prop-types';

import {i18n_msg, i18n_errors} from '../../../i18n/i18n'
import Header from '../../shell/Header'
import { isFieldMany } from '../../../utils/dico'
import Many from './many'
import Card from '../one/Card'
import Alert from 'widgets/Alert'
import Spinner from '../../shell/Spinner'
import Pagination from 'widgets/Pagination'

import './Cards.scss' 

export default class Cards extends Many {

	viewId = 'cards'

	render() {
	    const entity = this.props.match.params.entity,
			m = this.model
	  		
	  	if(m){
			const data = this.state.data ? this.state.data : [],
				full_count = this.pageSummary(data),
				fullCount = data.length ? (data[0]._full_count || 0) : 0,
				title = m.title || m.label
			let body
			
			if(this.state.loading){
				body = <Spinner></Spinner>
			}else if(!this.state.error){
				document.title = title
			 	if(data.length){
			 		const fieldCols = m.fields.filter(isFieldMany)
			 		body = <div className="evol-cards-body">
						{this.state.data.map(function(d, idx){
							return <Card key={idx} data={d} fields={fieldCols} entity={entity}/>
						})}
						<div className="clearer"></div>
					</div>
			 	}else if(this.state.loading){
					body = null
				}else{
			 		body = <Alert title="No data" message={i18n_msg.nodata.replace('{0}', m.namePlural)} type="info" /> 
			 	}
			}else{
				body = <Alert title="Error" message={this.state.error.message}/> 
			}
			return (
				<div data-entity={entity} className="evol-many-cards">
					
					<Header entity={entity} title={title} count={full_count} 
						cardinality='n' view={this.viewId} />

					{body}

					<Pagination 
						count={data.length} 
						fullCount={fullCount} 
						fnClick={this.clickPagination} 
						location={this.props.location}
					/>
				</div>
			)
	  	}else{
			return <Alert title="Error" message={i18n_errors.badEntity.replace('{0}', entity)}/>
		}
  	}

}

Cards.propTypes = {
	params: PropTypes.object
}