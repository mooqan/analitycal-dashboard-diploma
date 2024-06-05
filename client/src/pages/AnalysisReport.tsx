import { FC } from 'react'
import { useLocation } from 'react-router-dom'

const AnalysisReport: FC = () => {
	const location = useLocation()
	const { recommendations } = location.state || { recommendations: '' }

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Analysis Report</h1>
			<div className="p-4 bg-gray-800 text-white rounded">
				<h2 className="text-xl font-bold">Recommendations</h2>
				<p>{recommendations}</p>
			</div>
		</div>
	)
}

export default AnalysisReport
