import { useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { getLocalToken } from "../../helpers/validateToken";
import ItemEmployee from "../../components/ItemEmployee";

const Employes = () => {
	const loaded = useRef(false);
	const [listEmployees, setListEmployees] = useState(false);

	const { loading, error, bodySet, setError } = useFetch(
		`${process.env.REACT_APP_APIURL}/getallemployee`,
		"GET",
		{
			"Content-Type": "application/json",
			Authorization: `Bearer ${getLocalToken()}`,
		}
	);

	const getEmployees = async () => {
		let fetchResponse = await bodySet();
		if (fetchResponse.status === 200) {
			setListEmployees(await fetchResponse.json());
			return;
		}
		return setListEmployees(false);
	};

	useEffect(() => {
		if (!loaded.current) {
			getEmployees();
			loaded.current = true;
		} // eslint-disable-next-line
	}, []);

	return (
		<div>
			<div className="p-2">
				{listEmployees !== false ? (
					listEmployees.map((data) => (
						<div className="m-6" key={data.rut}>
							<ItemEmployee
								key={data.rut}
								name={data.name}
								rut={data.rut}
								rank={data.rank}
							/>
						</div>
					))
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Employes;
