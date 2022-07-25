/* eslint-disable no-case-declarations */
import {
	REGISTER,
	LOGIN,
	LOADING,
	LOGOUT,
	SET_PROFILE,
	SET_PAYMENTS,
	ADD_PROJECTS,
	DELETE_PROJECTS,
} from "./constants";

export const initialState = {
	loading: false,
	isAuth: localStorage.getItem("isAuth")
		? JSON.parse(localStorage.getItem("isAuth"))
		: false,
	user: localStorage.getItem("user")
		? JSON.parse(localStorage.getItem("user"))
		: {},
	alerts: [],
	queue: localStorage.getItem("queue")
		? JSON.parse(localStorage.getItem("queue"))
		: {},
	isQueueCreated: false,
	profile: localStorage.getItem("profile")
		? JSON.parse(localStorage.getItem("profile"))
		: null,
	payments: localStorage.getItem("payments")
		? JSON.parse(localStorage.getItem("payments"))
		: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case LOADING:
			return {
				...state,
				loading: true,
			};

		case REGISTER:
		case LOGIN:
			const user = {
				_id: action.payload._id,
				accessToken: action.payload.token,
				name: action.payload.name,
				profileUrl: action.payload.profileUrl,
			};
			localStorage.setItem("isAuth", JSON.stringify(true));
			localStorage.setItem("user", JSON.stringify(user));
			localStorage.setItem("accessToken", JSON.stringify(user.accessToken));
			return {
				...state,
				isAuth: true,
				user: user,
				loading: false,
			};

		case LOGOUT:
			localStorage.removeItem("user");
			localStorage.removeItem("isAuth");
			localStorage.removeItem("accessToken");
			localStorage.removeItem("payments");
			localStorage.removeItem("profile");
			localStorage.removeItem("isAdmin");
			return {
				isAuth: false,
				user: {},
				profile: {},
				isAdmin: false,
				payments: {},
			};

		case SET_PROFILE:
			const profile = {
				name: action.payload.name,
				personalEmail: action.payload.personalEmail,
				instituteEmail: action.payload.instituteEmail,
				scholarId: action.payload.scholarId,
				mobile: action.payload.mobile,
				branch: action.payload.branch,
				projects: action.payload.projects,
				cgpa: action.payload.cgpa,
			};
			localStorage.setItem("profile", JSON.stringify(profile));
			return { ...state, profile };

		case SET_PAYMENTS:
			const payments = {
				accountNo: action.payload.bankDetails.accountNo,
				accountHolderName: action.payload.bankDetails.accountHolderName,
				ifscCode: action.payload.bankDetails.ifscCode,
				branchName: action.payload.bankDetails.branchName,
				bankName: action.payload.bankDetails.bankName,
				prevPayments: action.payload.prevPayments,
			};
			console.log(action.payload, payments);
			localStorage.setItem("payments", JSON.stringify(payments));
			return { ...state, payments };
		case ADD_PROJECTS:
			return {
				...state,
				profile: {
					...state.profile,
					projects: [...state.profile.projects, action.payload],
				},
			};
		case DELETE_PROJECTS:
			const projects = state.profile?.projects?.filter(
				(el) => el._id !== action.payload
			);
			return {
				...state,
				profile: {
					...state.profile,
					projects,
				},
			};
		default:
			return state;
	}
};

export default reducer;
