import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { ReactComponent as IconChevronLeft } from "@/assets/svg/chevron-left.svg";
import { ReactComponent as IconEdit } from "@/assets/svg/edit-icon.svg";
import { KEYWORDS_CHECK } from "@/constants/applicant";
import { ADD_INFO } from "@/constants/formNew";
// import Toast from "@components/Common/Toast";
import ContentsBox from "@components/NewForm/ContentsBox";
import EditTypeBadge from "@components/NewForm/EditTypeBadge";
import ProcessBadge from "@components/NewForm/ProcessBadge";
import RequiredBadge from "@components/NewForm/RequiredBadge";
import SaveModal from "@components/NewForm/SaveModal";

const schema = z.object({
  formTitle: z.string().nonempty(),
  applicationTitle: z.string().nonempty(),
  interviewStartPeriod: z.string().nonempty(),
  interviewEndPeriod: z.string().nonempty(),
  applicationPeriod: z.string().nonempty(),
  question: z.string().nonempty(),
  agree: z.boolean().refine((val) => val),
});

type IRecuiteForm = z.infer<typeof schema>;

const NewForm = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [isSaveModal, setIsSaveModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<IRecuiteForm>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  // 뒤로가기 : 폼링크 관리 페이지로 이동
  const handleBackBtn = () => {
    navigate("/form");
  };

  // 임시저장
  const handleTempSaveBtn = () => {
    confirm("해당 기능은 개발 예정인 기능입니다.");
  };

  // 삭제
  const handleDelBtn = () => {
    navigate("/form");
  };

  // 폼 제출 : 인증됐으면 페이지이동, 안됐으면 인증코드에 focus
  const onSubmit = async (data: IRecuiteForm) => {
    console.log(data);
    setIsSaveModal(true);
  };

  return (
    <form
      className="px-[56px] pb-[164px] pt-0"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* 최상단 */}
      <div className="mb-[63px] flex justify-between">
        <IconChevronLeft onClick={handleBackBtn} />
        <div className="flex justify-center gap-3">
          <ProcessBadge>채용진행중</ProcessBadge>
          <EditTypeBadge>SELF</EditTypeBadge>
          <div className="flex items-center gap-3">
            <h2>
              <input
                className="Head3Semibold h-[46px] min-w-[420px] rounded-lg border border-gray-100 bg-gray-0 py-3.5 px-2 text-center text-gray-800"
                type="text"
                id="formTitle"
                placeholder="폼 이름을 입력해주세요."
                {...register("formTitle")}
              />
            </h2>
            <IconEdit />
          </div>
        </div>
        <div>
          <button
            className="SubHead1Semibold mr-4 rounded-lg bg-blue-50 py-2.5 px-6 text-blue-400"
            type="button"
            onClick={handleTempSaveBtn}
          >
            임시저장
          </button>
          <button
            className="SubHead1Semibold rounded-lg bg-error-50 py-2.5 px-6 text-error-400"
            type="button"
            onClick={handleDelBtn}
          >
            삭제
          </button>
        </div>
      </div>
      {/* 메인 내용 */}
      <div className="mb-10 flex flex-col gap-6">
        <ContentsBox className="h-[71px] gap-6">
          <h3 className="SubHead1Semibold text-gray-800">생성된 지원서 링크</h3>
          <p className="SubHead2Medium text-gray-300">
            폼 작성 완료 후 생성됩니다.
          </p>
        </ContentsBox>
        <ContentsBox>
          <div className="flex flex-col gap-4">
            <fieldset className="flex items-center gap-6">
              <label
                className="SubHead1Semibold w-[116px] text-gray-800"
                htmlFor="applicationTitle"
              >
                지원서 이름
              </label>
              <input
                className="h-[46px] w-[700px] rounded-lg border border-gray-100 bg-gray-0 px-6 py-3.5"
                type="text"
                id="applicationTitle"
                placeholder="인재에게 보일 지원서 이름을 작성해주세요."
                {...register("applicationTitle")}
              />
            </fieldset>
            <fieldset className="flex items-center gap-6">
              <label
                className="SubHead1Semibold w-[116px] text-gray-800"
                htmlFor="interviewPeriod"
              >
                면접가능 기간
              </label>
              <input
                type="date"
                id="interviewStartPeriod"
                {...register("interviewStartPeriod")}
              />
              <span>~</span>
              <input
                type="date"
                id="interviewEndPeriod"
                {...register("interviewEndPeriod")}
              />
            </fieldset>
            <fieldset className="flex items-center gap-6">
              <label
                className="SubHead1Semibold w-[116px] text-gray-800"
                htmlFor="applicationPeriod"
              >
                지원서 접수 마감일
              </label>
              <input
                type="date"
                id="applicationPeriod"
                {...register("applicationPeriod")}
              />
            </fieldset>
          </div>
        </ContentsBox>
        <ContentsBox className="flex flex-col items-baseline gap-4">
          <h3 className="SubHead1Semibold text-gray-800">인재 필수 수집정보</h3>
          <div className="flex gap-1.5">
            <RequiredBadge>이름</RequiredBadge>
            <RequiredBadge>전화번호</RequiredBadge>
            <RequiredBadge>이메일</RequiredBadge>
          </div>
        </ContentsBox>
        <div className="flex gap-8">
          <ContentsBox className="w-[190px] flex-col gap-4">
            <h3 className="SubHead1Semibold text-gray-800">인재 추가 정보</h3>
            <ul>
              {ADD_INFO.map((field) => {
                return (
                  <li
                    key={field.title}
                    className="flex h-[48px] w-[126px] items-center justify-between py-[15px]"
                  >
                    <label htmlFor={field.title}>{field.title}</label>
                    <input
                      type="checkbox"
                      id={field.title}
                      className="toggle toggle-sm"
                    />
                  </li>
                );
              })}
            </ul>
          </ContentsBox>
          <div className="w-full max-w-[930px] rounded-lg border-[1.5px] border-gray-50 bg-gray-0 p-0">
            <ul className="tab h-[66px] p-0">
              {ADD_INFO.map((field, index) => {
                return (
                  <li
                    className="tab-bordered tab"
                    key={field.title}
                    onClick={() => setActiveTab(index)}
                  >
                    {field.title}
                  </li>
                );
              })}
            </ul>
            <div>
              {ADD_INFO[activeTab].content}
              {ADD_INFO[activeTab].title === "자기소개" && (
                <>
                  <label htmlFor="question">
                    기업이 원하는 자기소개 주제를 적어주세요.
                  </label>
                  <input
                    className="input border border-gray-900"
                    type="text"
                    id="question"
                    placeholder="ex) 지원동기를 포함하여 자기소개를 적어주세요."
                    {...register("question")}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* 추천인재키워드 */}
      <ContentsBox className="mb-[52px] flex flex-col gap-8 py-[68px]">
        <div className="flex flex-col items-center gap-3">
          <h3 className="Head4Semibold text-black">추천 인재 키워드</h3>
          <p className="SubHead2Medium text-gray-400">
            10개 중 최소 5개 선택 가능합니다.
          </p>
        </div>
        <div className="grid h-[108px] max-w-[820px] grid-cols-5 gap-5">
          {KEYWORDS_CHECK.map((keyword) => (
            <button
              className="SubHead1Semibold h-[44px] w-[148px] rounded-lg border-[1.5px] border-gray-100 py-2.5 text-gray-200"
              key={keyword}
              type="button"
            >
              {keyword}
            </button>
          ))}
        </div>
      </ContentsBox>
      {/* 약관 동의 */}
      <div className="flex flex-col items-center justify-center gap-[29px]">
        <div className="flex gap-2">
          <label
            className="SubHead1Medium order-2 text-gray-400"
            htmlFor="agree"
          >
            기본설정 외에 입력하신 채용 공고가 다른 기업에게 노출될 수 있다는
            사실에 동의합니다.
          </label>
          <input
            className="order-1"
            type="checkbox"
            id="agree"
            {...register("agree")}
          />
        </div>
      </div>
      {/* 제출완료 버튼 */}
      <button
        type="submit"
        className={`SubHead1Semibold btn h-11 w-[106px] cursor-pointer rounded-lg px-6 py-2.5 text-gray-0 ${
          isValid ? "bg-blue-500" : "bg-gray-200"
        }`}
      >
        작성완료
      </button>
      {isSaveModal && <SaveModal setIsSaveModal={setIsSaveModal} />}
    </form>
  );
};
export default NewForm;
