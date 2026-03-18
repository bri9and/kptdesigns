"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

interface UserMenuProps {
  size?: "sm" | "md";
}

export function UserMenu({ size = "sm" }: UserMenuProps) {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const email = user.primaryEmailAddress?.emailAddress ?? "";
  const isPrivateRelay = email.includes("privaterelay");
  const hasName = !!(user.firstName && user.lastName);

  // Build a human-readable display name
  let displayName: string;
  if (user.fullName) {
    displayName = user.fullName;
  } else if (user.firstName) {
    displayName = user.firstName;
  } else if (isPrivateRelay) {
    displayName = "Apple User";
  } else if (email) {
    displayName = email.split("@")[0];
  } else {
    displayName = "User";
  }

  // Build initials
  let initials: string;
  if (user.firstName && user.lastName) {
    initials = user.firstName.charAt(0) + user.lastName.charAt(0);
  } else if (user.firstName) {
    initials = user.firstName.charAt(0);
  } else if (!isPrivateRelay && email) {
    initials = email.charAt(0).toUpperCase();
  } else {
    initials = "U";
  }

  // Display email — hide private relay garbage
  const displayEmail = isPrivateRelay ? "Apple Private Email" : email;

  const sizeClasses = size === "md" ? "w-9 h-9" : "w-8 h-8";

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`${sizeClasses} rounded-full overflow-hidden flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-qyellow/50 transition-opacity hover:opacity-80`}
        aria-label="User menu"
      >
        {user.imageUrl ? (
          <img
            src={user.imageUrl}
            alt={displayName}
            className={`${sizeClasses} rounded-full object-cover`}
          />
        ) : (
          <span className={`${sizeClasses} rounded-full bg-qyellow text-white font-semibold flex items-center justify-center text-sm`}>
            {initials}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl bg-qblack-light border border-white/10 shadow-xl z-50 py-1.5 overflow-hidden">
          <div className="px-4 py-3">
            <p className="text-white font-semibold text-sm truncate">
              {displayName}
            </p>
            <p className="text-white/40 text-xs truncate mt-0.5">
              {displayEmail}
            </p>
          </div>

          {/* Prompt to complete profile if no name */}
          {!hasName && (
            <>
              <div className="border-t border-white/[0.08]" />
              <button
                onClick={() => {
                  setOpen(false);
                  router.push("/complete-profile");
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-qyellow hover:bg-white/[0.04] transition-colors flex items-center gap-2"
              >
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0" /></svg>
                Set your display name
              </button>
            </>
          )}

          <div className="border-t border-white/[0.08]" />

          <button
            onClick={() => {
              setOpen(false);
              router.push("/dashboard/account");
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-white/80 hover:bg-white/[0.04] hover:text-white transition-colors"
          >
            Manage Account
          </button>

          <div className="border-t border-white/[0.08]" />

          <button
            onClick={() => signOut(() => router.push("/"))}
            className="w-full text-left px-4 py-2.5 text-sm text-white/60 hover:text-red-400 hover:bg-white/[0.04] transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
