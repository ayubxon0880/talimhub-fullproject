import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useTranslation } from "react-i18next";
const WorkIcon = () => <></>;

export default function HowWorks() {
    const { t } = useTranslation();
    const { first, two, three, four } = t("how");
    return (
        <div>
            <VerticalTimeline className="before:bg-slate-900 dark:before:bg-white before:animate-pulse">
                <VerticalTimelineElement
                    className="vertical-timeline-element--work  before:hidden"
                    contentStyle={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "30px",
                        padding: 0,
                    }}
                    iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                    contentArrowStyle={{ borderRight: "7px solid  rgba(255, 255, 255, 0.837)" }}
                    icon={<WorkIcon />}
                >
                    <div
                        className="w-full py-6 h-full text-center group space-y-3 sm:space-y-6 bg-gray-800 hover:bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_40px_#007cfff0] text-white hover:text-black duration-300 rounded-[30px]">
                        <h3 className="vertical-timeline-element-title text-2xl md:text-3xl text-center ">
                            {t(first)}
                        </h3>
                        <svg className='w-24 mx-auto my-3 fill-white' patternContentUnits="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 237.159 310.664"><path d="M65.157 20c0-5.515 4.488-10 10.002-10h142c5.514 0 9.998 4.485 9.998 10v212c0 5.514-4.484 9.999-9.998 9.999H75.791V252h141.368c11.045 0 20-8.955 20-20V20c0-11.047-8.955-20-20-20h-142c-11.047 0-20 8.953-20 20v56.807a24.35 24.35 0 0 1 9.998 3.428V20zM101.826 257v27.334H86.493v9.332h119.333v-9.332h-15.334V257z" /><path d="M16.455 159.165c-.003-.007-.003-.015-.006-.022-.182-.602-.3-1.207-.37-1.824a11.11 11.11 0 0 1-.078-1.272c-.05-3.12 1.417-6.864 3.699-9.927v152.182c0 6.83 5.537 12.363 12.363 12.363 6.828 0 12.365-5.533 12.365-12.363v-90.271h4.635v90.271c0 6.83 5.537 12.363 12.363 12.363 6.828 0 12.365-5.533 12.365-12.363V142.367a351.44 351.44 0 0 0 4.563 4.147c2.423 2.159 4.934 4.327 7.188 6.089 1.139.887 2.192 1.668 3.317 2.375.573.354 1.155.695 1.94 1.051.826.316 1.705.819 3.932.885a8.424 8.424 0 0 0 2.752-.457c1.621-.5 3.529-1.961 4.457-3.665a8.397 8.397 0 0 0 1.131-4.237c-.032-1.707-.365-2.6-.636-3.379-.008-.023-.014-.049-.023-.072-.711-1.811-1.482-3.016-2.592-4.733-3.279-4.935-9.682-13.11-21.491-27.179a7.952 7.952 0 0 0-3.412-2.373 24.657 24.657 0 0 1-9.783 11.26c.017.031.031.063.049.094h9.436c2.594 0 5.053.988 6.927 2.783l1.304 1.24c.831.785 3.354 3.134 3.354 3.134l-.92 1.871-.439-.403a427.487 427.487 0 0 1-4.686-4.397 7.961 7.961 0 0 0-5.539-2.228h-10c-.052 0-.103.006-.155.008H28.68a8.016 8.016 0 0 0-.973-.065c-3.95.028-7.385 1.305-10.49 3.071-4.644 2.695-8.699 6.67-11.857 11.557C2.242 143.625.019 149.521 0 156.046c0 2.528.351 5.137 1.131 7.72.16.531.386 1.021.639 1.49-.042.008-.082.011-.124.018 1.709 4.645 4.835 9.039 9.257 12.673 2.005 1.655 4.276 3.167 6.799 4.552v-20.646a11.42 11.42 0 0 1-1.247-2.688z" /><path d="M60.411 122.18c8.476-3.226 14.501-11.422 14.501-21.031 0-12.427-10.073-22.5-22.5-22.5-12.426 0-22.5 10.073-22.5 22.5 0 9.609 6.025 17.806 14.501 21.031h15.998z" /></svg>
                    </div>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "30px",
                        padding: 0,
                    }}
                    iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                    contentArrowStyle={{ borderRight: "7px solid  rgba(255, 255, 255, 0.837)" }}
                    icon={<WorkIcon />}
                >
                    <div
                        className="w-full py-6 h-full text-center group space-y-3 sm:space-y-6 bg-gray-800 hover:bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_40px_#007cfff0] text-white hover:text-black duration-300 rounded-[30px]">
                        <h3 className="vertical-timeline-element-title text-2xl md:text-3xl text-center ">
                            {t(two)}
                        </h3>
                        <svg className="w-24 mx-auto my-3 fill-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 18L20 18" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
                            <path d="M4 12L20 12" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
                            <path d="M4 6L20 6" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </div>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "30px",
                        padding: 0,
                    }}
                    iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                    contentArrowStyle={{ borderRight: "7px solid  rgba(255, 255, 255, 0.837)" }}
                    icon={<WorkIcon />}
                >
                    <div
                        className="w-full py-6 h-full text-center group space-y-3 sm:space-y-6 bg-gray-800 hover:bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_40px_#007cfff0] text-white hover:text-black duration-300 rounded-[30px]">
                        <h3 className="vertical-timeline-element-title text-2xl md:text-3xl text-center ">
                            {t(three)}
                        </h3>
                        <svg className="w-24 mx-auto my-3 fill-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                            <g id="SVGRepo_iconCarrier"> <rect id="Rectangle_4" data-name="Rectangle 4" width="24" height="24" fill="none"/> <g id="Rectangle_9" data-name="Rectangle 9" transform="translate(8 3)" fill="none" stroke="#ffffff" stroke-miterlimit="10" stroke-width="1.5"> <rect width="8" height="12" rx="4" stroke="none"/> <rect x="0.75" y="0.75" width="6.5" height="10.5" rx="3.25" fill="none"/> </g> <path id="Path_2" data-name="Path 2" d="M1,0V4" transform="translate(11 17)" fill="none" stroke="#ffffff" stroke-miterlimit="10" stroke-width="1.5"/> <rect id="Rectangle_10" data-name="Rectangle 10" width="6" height="1.5" transform="translate(9 20)"/> <path id="Path_3" data-name="Path 3" d="M0,0S.088,6,6,6s6-6,6-6" transform="translate(6 11)" fill="none" stroke="#ffffff" stroke-miterlimit="10" stroke-width="1.5"/> </g>
                        </svg>
                    </div>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "30px",
                        padding: 0,
                    }}
                    iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                    contentArrowStyle={{ borderRight: "7px solid  rgba(255, 255, 255, 0.837)" }}
                    icon={<WorkIcon />}
                >
                    <div
                        className="w-full py-6 h-full text-center group space-y-3 sm:space-y-6 bg-gray-800 hover:bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_40px_#007cfff0] text-white hover:text-black duration-300 rounded-[30px]">
                        <h3 className="vertical-timeline-element-title text-2xl md:text-3xl text-center ">
                            {t(four)}
                        </h3>
                        <svg className="w-24 mx-auto my-3 fill-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                            <g id="SVGRepo_iconCarrier"> <path fill="#ffffff" d="M4.1 2h-.2A2.906 2.906 0 0 0 1 4.9v1.2A2.906 2.906 0 0 0 3.9 9h.2A2.906 2.906 0 0 0 7 6.1V4.9A2.906 2.906 0 0 0 4.1 2zM4 10a4.012 4.012 0 0 0-4 4v2.667a1.326 1.326 0 0 0 1.333 1.324l5.333.01A1.337 1.337 0 0 0 8 16.667V14a4.01 4.01 0 0 0-4-4zM18 1v4a1 1 0 0 1-1 1h-3.99l-1.19 1.88a.47.47 0 0 1-.32.12.538.538 0 0 1-.21-.05.493.493 0 0 1-.29-.45V6h-1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1z"/> </g>
                        </svg>
                    </div>
                </VerticalTimelineElement>
            </VerticalTimeline>
        </div >
    );
}