import { getAllSubmissions, getAllSubmissionsPublic, getUserFromRequest } from "../../../lib/server";
import Image from "next/image";
import Link from "next/link";

import { HandThumbUpIcon, EyeIcon } from "@heroicons/react/24/solid";

export default async function Submissions() {
  let fetchedSubmissions = await getAllSubmissionsPublic();
  const user = await getUserFromRequest();
  if (user?.role === "ADMIN") {
    fetchedSubmissions = await getAllSubmissions();
  }

  console.log(fetchedSubmissions);
  return (
    <div className="font-montserrat text-white">
      <h1 className="mx-3 mb-4 mt-6 text-4xl font-bold">Submissions</h1>
      <div className="mx-3">
        <div className="flex flex-row flex-wrap gap-1.5">
          {fetchedSubmissions.map((submission, i) => (
            <Link
              key={i}
              className="flex w-36 cursor-pointer flex-col overflow-hidden"
              href={`/dashboard/submissions/${submission.id}`}
            >
              <div className="relative h-36 w-full overflow-auto rounded-md">
                <span>
                  <Image className="object-fill" alt="" fill src={submission.icon}></Image>
                </span>
              </div>
              <div className="relative mb-1 mt-1.5 max-h-11 w-full overflow-hidden text-ellipsis text-start">
                <h1 className="text-base font-medium">{submission.name}</h1>
              </div>
              <div className="relative text-start text-base font-normal">
                {" "}
                <HandThumbUpIcon className="inline-block h-4 w-4" />
                <span className="pl-1 pr-3">N/A</span>
                <EyeIcon className="inline-block h-4 w-4" />
                <span className="pl-1 pr-3">N/A</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
